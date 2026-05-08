import { createColumnHelper } from "@tanstack/react-table";
import { CategoryById, SkillTableRow } from "./types";

export const columnHelper = createColumnHelper<SkillTableRow>();

export const findCategory = (row: SkillTableRow, categoryById: CategoryById) => {
  const categoryId = row.category?.id;
  if (!categoryId) return undefined;

  return categoryById.get(categoryId);
};

export const getCategoryTypeName = (
  row: SkillTableRow,
  categoryById: CategoryById,
): string | null => {
  const category = findCategory(row, categoryById);
  if (!category) return null;

  return category.parent?.name ?? category.name;
};

export const getCategoryName = (row: SkillTableRow, categoryById: CategoryById): string | null => {
  return findCategory(row, categoryById)?.name ?? null;
};
