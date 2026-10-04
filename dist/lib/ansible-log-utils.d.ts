/**
 * Ansible Log Utilities
 *
 * Provides semantic coloring for Ansible playbook execution logs.
 * Uses theme colors for automatic light/dark mode support.
 *
 * Note: This is NOT for code syntax highlighting - use a syntax highlighter
 * library (like Shiki or Prism) for that purpose.
 */
export type AnsibleLogType = 'task' | 'play' | 'ok' | 'changed' | 'skipped' | 'failed' | 'error' | 'start' | 'complete' | 'default';
/**
 * Get the CSS class for an Ansible log type
 * Uses theme semantic colors (primary, success, warning, destructive)
 */
export declare function getAnsibleLogClassName(type: AnsibleLogType): string;
/**
 * Get the prefix symbol for an Ansible log type
 * These symbols appear before each log line
 */
export declare function getAnsibleLogPrefix(type: AnsibleLogType): string;
/**
 * Example usage:
 *
 * import { getAnsibleLogClassName, getAnsibleLogPrefix } from '../lib/ansible-log-utils';
 *
 * <div className="max-h-96 overflow-y-auto p-4 bg-muted/30 rounded-lg font-mono text-sm">
 *   {logs.map((log, idx) => (
 *     <div key={idx} className={getAnsibleLogClassName(log.type)}>
 *       <span className="text-muted-foreground">{getAnsibleLogPrefix(log.type)} </span>
 *       {log.message}
 *     </div>
 *   ))}
 * </div>
 */
//# sourceMappingURL=ansible-log-utils.d.ts.map