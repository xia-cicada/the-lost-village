import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useGameStore = defineStore('game', {
  state: () => ({
    // 时间系统
    gameTime: dayjs('2025-06-05 08:00'),
    timeScale: 60, // 游戏分钟:现实秒

    // 角色系统
    player: {
      stamina: 100,
      mood: 80,
      inventory: [] as Item[],
      currentScene: 'home'
    },

    // 场景数据
    scenes: {
      home: {
        id: 'home',
        name: '老家',
        adjacentScenes: []
      },
      riverside: {
        id: 'riverside',
        name: '老家',
        adjacentScenes: []
      }
    } as Record<string, Scene>
  }),

  actions: {
    // 时间流逝逻辑
    advanceTime(minutes: number) {
      this.gameTime = this.gameTime.add(minutes, 'minute')

      // 体力恢复逻辑（每小时恢复10点）
      if (minutes >= 60) {
        this.player.stamina = Math.min(100, this.player.stamina + 10)
      }
    },

    // 物品管理
    addItem(item: Item) {
      if (this.player.inventory.length < 10) {
        this.player.inventory.push(item)
        return true
      }
      return false
    },

    // 场景切换
    changeScene(target: string) {
      const current = this.player.currentScene
      const travelTime =
        this.scenes[current].adjacentScenes.find((s) => s.sceneId === target)?.travelTime || 0

      this.advanceTime(travelTime)
      this.player.stamina -= travelTime * 0.5 // 每移动1分钟消耗0.5体力
      this.player.currentScene = target
    }
  }
})

// 核心数据类型
interface Item {
  id: string
  name: string
  type: 'food' | 'tool' | 'toy' | 'collectible'
  staminaEffect?: number
  moodEffect?: number
}

interface Scene {
  id: string
  name: string
  adjacentScenes: {
    sceneId: string
    travelTime: number
  }[]
}
