// =============================================================
// useDocumentTitle
// خطاف (Hook) بسيط وقابل لإعادة الاستخدام لتحديث عنوان التبويب
// (document.title) من أي صفحة، مع إعادته للقيمة السابقة عند
// إلغاء تركيب المكوّن (Cleanup) لتفادي بقاء عنوان غير صحيح
// =============================================================

import { useEffect } from 'react';
import { APP_NAME } from '../constants';

/**
 * يحدّث عنوان الصفحة في المتصفح.
 * @param title - العنوان الخاص بالصفحة الحالية (بدون اسم التطبيق)
 */
export function useDocumentTitle(title: string): void {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title ? `${title} · ${APP_NAME}` : APP_NAME;

        // إعادة العنوان السابق عند مغادرة الصفحة (تنظيف الأثر الجانبي)
        return () => {
            document.title = previousTitle;
        };
    }, [title]);
}
