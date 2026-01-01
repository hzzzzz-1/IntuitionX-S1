/**
 * 后端任务相关的类型定义
 */

// 转录段落
export interface TranscriptSegment {
  segment_id: string;
  start: number; // 秒
  end: number; // 秒
  text: string;
}

// 关键词项
export interface KeywordItem {
  term: string;
  definition: string;
  mentions: Array<{ segment_id: string }>;
}

// 任务结果
export interface TaskResult {
  task_id: string;
  status: 'pending' | 'processing' | 'finished' | 'failed';
  video_url?: string; // 上传视频的 URL（可选）
  transcript: {
    segments: TranscriptSegment[];
  };
  keywords: {
    items: KeywordItem[];
  };
}

// SSE 事件数据
export interface TaskEvent {
  stage?: 'slicing' | 'asr' | 'llm_summary' | 'finalize';
  status?: 'pending' | 'processing' | 'finished' | 'failed';
  progress?: number;
  message?: string;
}
