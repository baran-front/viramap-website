// app/api/faqs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/components/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const tenant = request.headers.get('Tenant') || API_CONFIG.DEFAULT_TENANT;
    const locale = request.headers.get('Accept-Language') || API_CONFIG.DEFAULT_LOCALE;
    const authHeader = request.headers.get('Authorization');
    
    // دریافت body از request (اگر وجود داشته باشد)
    const body = await request.json().catch(() => ({}));
    
    // ساخت headers برای درخواست به API خارجی
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
      'Tenant': tenant,
    };
    
    // اضافه کردن Authorization header اگر وجود داشته باشد
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    // ارسال درخواست به API خارجی
    const response = await fetch(`${API_CONFIG.BASE_URL}/v1/faqs/client/search`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'خطا در دریافت داده‌ها' }));
      return NextResponse.json(
        { error: errorData.message || `خطای ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('خطا در دریافت سوالات متداول:', error);
    return NextResponse.json(
      { error: 'خطا در اتصال به سرور' },
      { status: 500 }
    );
  }
}

