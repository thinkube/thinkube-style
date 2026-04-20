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
    <div className="space-y-6 p-8">
      {(title || description) && (
        <div>
          {title && (
            <h1 className="text-2xl font-heading font-bold">{title}</h1>
          )}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
