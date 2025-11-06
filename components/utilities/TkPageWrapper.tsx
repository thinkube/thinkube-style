/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";

export function TkPageWrapper({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="container mx-auto px-6 py-8" style={{
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
      perspective: 1000,
      WebkitPerspective: 1000
    }}>
      {title && (
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold mb-2">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
