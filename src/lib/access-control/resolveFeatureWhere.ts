import { and, type SQL } from "drizzle-orm";

/**
 * Returns the SQL condition if the feature flag is enabled, otherwise undefined.
 */
export function getFeatureWhere(
  enabled: boolean | undefined,
  sqlCondition: SQL,
) {
  return enabled ? sqlCondition : undefined;
}

/**
 * Resolves multiple feature flag conditions into a single SQL AND condition.
 *
 * Usage:
 * ```ts
 * const where = resolveFeatureWhere(
 *   getFeatureWhere(options.hideAssigned, isNull(table.assignedTo)),
 *   getFeatureWhere(options.showOnlyActive, eq(table.status, 'active'))
 * );
 * ```
 */
export function resolveFeatureWhere(...conditions: (SQL | undefined)[]) {
  return and(...conditions);
}
