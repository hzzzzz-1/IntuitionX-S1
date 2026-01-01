/**
 * 后端 TaskResult 到前端组件格式的映射工具
 */

import type { TaskResult, TranscriptSegment, KeywordItem } from '../types/task';
import type { VideoSegmentData, KnowledgeCardData } from '../data/videoTimelineData';

/**
 * 将后端 transcript.segments 映射为前端 videoSegments
 */
export function mapTranscriptToVideoSegments(segments: TranscriptSegment[]): VideoSegmentData[] {
  return segments.map((segment) => ({
    id: segment.segment_id,
    startTime: segment.start,
    endTime: segment.end,
    title: segment.text.substring(0, 30) + (segment.text.length > 30 ? '...' : ''),
    description: segment.text,
    content: segment.text,
  }));
}

/**
 * 将后端 keywords.items 映射为前端 knowledgeCards
 */
export function mapKeywordsToKnowledgeCards(
  keywords: KeywordItem[],
  segments: TranscriptSegment[]
): KnowledgeCardData[] {
  return keywords.map((keyword) => {
    // 从 mentions 中提取第一个 segment_id，找到对应的 start 时间
    const firstMention = keyword.mentions[0];
    const matchedSegment = segments.find((seg) => seg.segment_id === firstMention.segment_id);
    const time = matchedSegment ? matchedSegment.start : 0;

    return {
      word: keyword.term,
      simple: keyword.definition,
      deep: keyword.definition, // 如果后端没有区分简单和深度解释，暂时使用相同内容
      time,
    };
  });
}

/**
 * 完整映射 TaskResult
 */
export function mapTaskResult(taskResult: TaskResult) {
  const videoSegments = mapTranscriptToVideoSegments(taskResult.transcript.segments);
  const knowledgeCards = mapKeywordsToKnowledgeCards(
    taskResult.keywords.items,
    taskResult.transcript.segments
  );

  return {
    videoSegments,
    knowledgeCards,
  };
}
