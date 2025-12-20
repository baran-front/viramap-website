این پوشه قبلاً برای route `/api/faqs` استفاده می‌شد،  
اما از آن‌جا که `safeFetch` همیشه آدرس را با `API_CONFIG.BASE_URL` ترکیب می‌کند،  
فراخوانی `/api/faqs` در واقع به سرور خارجی با مسیر اشتباه `.../api/faqs` می‌رفت و 404 می‌داد.  

الان کاملاً از route `/api/faqs` صرف‌نظر شده و به‌جای آن،  
تابع `fetchFAQs` در `components/lib/fetchs.ts` مستقیماً آدرس درست بک‌اند  
`/v1/faqs/client/search` را صدا می‌زند.


