/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { toast as sonnerToast } from "sonner"

/**
 * tkToast - Toast notification function
 * Thinkube-approved toast notifications from thinkube-style
 */
export const tkToast = {
  success: sonnerToast.success,
  error: sonnerToast.error,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  message: sonnerToast.message,
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
  loading: sonnerToast.loading,
}
