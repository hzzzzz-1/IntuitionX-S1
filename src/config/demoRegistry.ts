/**
 * Demo 调度中心 - 配置驱动的多场景演示系统
 *
 * 核心理念：
 * - Fast-Track 模式：假上传，真回显（拉取本地预先准备好的数据）
 * - 多行业切换：通过 ACTIVE_DEMO_KEY 一键切换场景
 * - 配置驱动：所有路径、数据从配置表读取，新增 Demo 只需加一行配置
 */

export interface DemoConfig {
  id: string;
  name: string;
  videoPath: string;          // 视频文件路径 (public/videos/xxx.mp4)
  dataPath: string;            // JSON 数据路径 (public/data/xxx.json)
  thumbnail?: string;          // 缩略图路径（可选）
  description: string;         // Demo 描述
  category: 'medicine' | 'finance' | 'history' | 'tech';
}

/**
 * Demo 配置表 - 所有可用的演示场景
 */
export const DEMO_REGISTRY: Record<string, DemoConfig> = {
  medicine: {
    id: 'medicine',
    name: '医药价格分析',
    videoPath: '/videos/medicine.mp4',
    dataPath: '/data/test1.json',
    description: '分析医院、药店、互联网三种渠道的药价差异',
    category: 'medicine',
  },

  // 预留：金融场景
  finance: {
    id: 'finance',
    name: '金融市场分析',
    videoPath: '/videos/finance.mp4',
    dataPath: '/data/finance.json',
    description: '2025年全球经济与关税新格局',
    category: 'finance',
  },

  // 预留：历史场景
  history: {
    id: 'history',
    name: '明朝历史讲解',
    videoPath: '/videos/history.mp4',
    dataPath: '/data/history.json',
    description: '从朱元璋到永乐大帝的明朝开国史',
    category: 'history',
  },
};

/**
 * 当前激活的 Demo Key
 * 修改这个值即可切换整个系统的演示场景
 */
export const ACTIVE_DEMO_KEY: keyof typeof DEMO_REGISTRY = 'medicine';

/**
 * 获取当前激活的 Demo 配置
 */
export function getActiveDemo(): DemoConfig {
  return DEMO_REGISTRY[ACTIVE_DEMO_KEY];
}

/**
 * 获取指定 Demo 的配置
 */
export function getDemoById(id: string): DemoConfig | undefined {
  return DEMO_REGISTRY[id];
}

/**
 * 获取所有可用的 Demo 列表
 */
export function getAllDemos(): DemoConfig[] {
  return Object.values(DEMO_REGISTRY);
}

/**
 * Fast-Track 模式配置
 */
export const FAST_TRACK_CONFIG = {
  enabled: true,                    // 是否启用 Fast-Track 模式
  simulateDelay: true,             // 是否模拟上传延迟
  stageDelays: {                   // 各阶段模拟延迟时间（毫秒）
    slicing: 800,
    asr: 1200,
    llm_summary: 1500,
    llm_keywords: 1000,
    finalize: 500,
  },
  totalDuration: 5000,             // 总模拟时长（毫秒）- 用于快速演示
} as const;
