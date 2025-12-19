import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
// [修复] 导入我们新的、专用于 Go 后端的 API 服务
import { getClusterList, getActiveCluster, setActiveCluster } from "@/api/cluster"
import type { ClusterInfo as ApiClusterInfo } from "@/api/cluster"
import { ElMessage } from "element-plus"
import { setCurrentClusterId } from "@/utils/cluster-context"

// 扩展接口以包含UI需要的显示名称
export interface ClusterInfo extends ApiClusterInfo {
  displayName: string
}

const STORE_KEY_SELECTED_CLUSTER = "selectedClusterId" // 改为存储ID

export const useClusterStore = defineStore("cluster", () => {
  const availableClusters = ref<ClusterInfo[]>([])
  const selectedClusterId = ref<string | null>(localStorage.getItem(STORE_KEY_SELECTED_CLUSTER) || null)
  const loadingClusters = ref<boolean>(false)
  const activeClusterFromServer = ref<string>("")

  // 计算属性：获取当前选择集群的名称（向后兼容）
  const selectedClusterName = computed(() => {
    if (!selectedClusterId.value) return null
    const cluster = availableClusters.value.find(c => c.id === selectedClusterId.value)
    return cluster ? cluster.name : null
  })

  // 计算属性：获取当前选择集群的ID
  const selectedClusterID = computed(() => selectedClusterId.value)

  // 计算属性：提供一个默认的显示名称
  const currentClusterDisplayName = computed(() => {
    if (!selectedClusterId.value) return "未选择集群"
    const cluster = availableClusters.value.find(c => c.id === selectedClusterId.value)
    return cluster ? cluster.displayName : "未知集群"
  })

  // Action: 从后端获取可用集群列表
  async function fetchAvailableClusters() {
    if (loadingClusters.value) return
    loadingClusters.value = true
    try {
      console.log('🚀 开始获取集群列表...')
      // [修复] 调用真实的后端 API
      const [listRes, activeRes] = await Promise.all([getClusterList(), getActiveCluster()])

      console.log('📡 API响应 - 集群列表:', listRes)
      console.log('📡 API响应 - 活动集群:', activeRes)

      // 后端返回 {code: 200, data: [...], message: "..."} 格式
      const rawClusters = listRes.data
      activeClusterFromServer.value = activeRes.data

      console.log('📋 解析后的集群数据:', rawClusters)
      console.log('🎯 活动集群ID:', activeClusterFromServer.value)

      // 转换为包含 displayName 的 UI 模型
      availableClusters.value = rawClusters.map(c => ({
        ...c,
        displayName: `${c.name} (${c.environment})`
      }))

      // 如果当前没有选中的集群，或者选中的集群已失效，则自动选择
      const currentSelectionIsValid = selectedClusterId.value && availableClusters.value.some(c => c.id === selectedClusterId.value)
      if (!currentSelectionIsValid) {
        // 优先选择后端标记的 active 集群，其次选择列表第一个
        const activeCluster = availableClusters.value.find(c => c.name === activeClusterFromServer.value)
        if (activeCluster) {
          await setSelectedClusterId(activeCluster.id)
        } else if (availableClusters.value.length > 0) {
          await setSelectedClusterId(availableClusters.value[0].id)
        } else {
          await setSelectedClusterId(null)
        }
      }
    } catch (error) {
      console.error("获取可用集群列表时发生网络错误:", error)
      ElMessage.error("获取可用集群列表失败，请检查网络或后端服务。")
      availableClusters.value = []
      setSelectedClusterId(null)
    } finally {
      loadingClusters.value = false
    }
  }

  // Action: 设置当前选中的集群（通过ID）
  async function setSelectedClusterId(clusterId: string | null) {
    selectedClusterId.value = clusterId
    if (clusterId) {
      localStorage.setItem(STORE_KEY_SELECTED_CLUSTER, clusterId)

      // 同时调用后端API设置活动集群
      try {
        await setActiveCluster(clusterId)
        const cluster = availableClusters.value.find(c => c.id === clusterId)
        console.log(`已将后端活动集群设置为: ${cluster?.name || clusterId}`)
      } catch (error) {
        console.warn(`设置后端活动集群失败:`, error)
        // 不阻止前端状态更新，只是警告
      }
    } else {
      localStorage.removeItem(STORE_KEY_SELECTED_CLUSTER)
    }
  }

  // Action: 设置当前选中的集群（通过名称，向后兼容）
  async function setSelectedClusterName(clusterName: string | null) {
    if (!clusterName) {
      await setSelectedClusterId(null)
      return
    }
    const cluster = availableClusters.value.find(c => c.name === clusterName)
    if (cluster) {
      setSelectedClusterId(cluster.id)
    } else {
      console.warn(`未找到名为 ${clusterName} 的集群`)
    }
  }

  // 监听集群选择变化，同步到全局上下文
  watch(selectedClusterId, (newClusterID) => {
    setCurrentClusterId(newClusterID)
  }, { immediate: true })

  return {
    availableClusters,
    selectedClusterName, // 向后兼容
    selectedClusterId,
    selectedClusterID,
    loadingClusters,
    currentClusterDisplayName,
    fetchAvailableClusters,
    setSelectedClusterName, // 向后兼容
    setSelectedClusterId,
  }
})
