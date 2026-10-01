import express from 'express';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json());

// Real SMS Provider API Proxy Endpoints

// 1. Check Real Account Balance on Provider
app.get('/api/sms/balance', async (req, res) => {
  try {
    const { site, apiKey } = req.query as { site: string; apiKey: string };
    if (!apiKey) {
      return res.status(400).json({ error: 'يرجى تزويد مفتاح الـ API' });
    }

    if (site === '5sim') {
      const response = await fetch('https://5sim.biz/v1/user/profile', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return res.json({
        site: '5sim.biz',
        balance: data.balance || 0,
        email: data.email || '',
        rating: data.rating || 0,
        raw: data
      });
    }

    if (site === 'man' || site === 'sms-man') {
      const response = await fetch(`http://api.sms-man.ru/stubs/handler_api.php?action=getBalance&api_key=${apiKey}`);
      const text = await response.text();
      // Format: ACCESS_BALANCE:15.5
      const parts = text.split(':');
      const balance = parts[1] ? parseFloat(parts[1]) : 0;
      return res.json({
        site: 'sms-man.ru',
        balance: balance,
        raw: text
      });
    }

    if (site === 'vak') {
      const response = await fetch(`https://vak-sms.com/stubs/handler_api.php?action=getBalance&api_key=${apiKey}`);
      const text = await response.text();
      const parts = text.split(':');
      const balance = parts[1] ? parseFloat(parts[1]) : 0;
      return res.json({
        site: 'Vak-sms.com',
        balance: balance,
        raw: text
      });
    }

    if (site === 'onlinesim') {
      const response = await fetch(`https://onlinesim.io/api/getBalance.php?apikey=${apiKey}`);
      const data = await response.json();
      return res.json({
        site: 'onlinesim.io',
        balance: data.balance || 0,
        raw: data
      });
    }

    return res.status(400).json({ error: 'الموقع غير مدعوم حالياً' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'خطأ أثناء الاتصال بالمزود' });
  }
});

// 2. Buy Real Number
app.post('/api/sms/buy', async (req, res) => {
  try {
    const { site, apiKey, country, operator, product } = req.body;
    if (!apiKey) {
      return res.status(400).json({ error: 'يرجى إدخال مفتاح API الخاص بك' });
    }

    if (site === '5sim') {
      const op = operator || 'any';
      const c = country || 'russia';
      const p = product || 'whatsapp';
      const response = await fetch(`https://5sim.biz/v1/user/buy/activation/${c}/${op}/${p}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();

      if (data.phone) {
        return res.json({
          status: 'success',
          id: data.id,
          phone: data.phone,
          operator: data.operator,
          product: data.product,
          price: data.price,
          expires: data.expires,
          country: data.country
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: typeof data === 'string' ? data : (data.error || 'لا توجد أرقام متوفرة حالياً أو رصيدك غير كافٍ')
        });
      }
    }

    if (site === 'man' || site === 'sms-man') {
      const response = await fetch(`http://api.sms-man.ru/stubs/handler_api.php?action=getNumber&api_key=${apiKey}&service=${product || 'wa'}&country=${country || '0'}`);
      const text = await response.text();
      // Format: ACCESS_NUMBER:123456:79991234567
      if (text.startsWith('ACCESS_NUMBER')) {
        const parts = text.split(':');
        return res.json({
          status: 'success',
          id: parts[1],
          phone: parts[2]
        });
      } else {
        return res.status(400).json({ status: 'error', message: text });
      }
    }

    return res.status(400).json({ error: 'الموقع غير مدعوم' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'خطأ أثناء تنفيذ عملية الشراء' });
  }
});

// 3. Check Real SMS Code
app.get('/api/sms/check', async (req, res) => {
  try {
    const { site, apiKey, id } = req.query as { site: string; apiKey: string; id: string };
    if (!apiKey || !id) {
      return res.status(400).json({ error: 'المعاملات ناقصة' });
    }

    if (site === '5sim') {
      const response = await fetch(`https://5sim.biz/v1/user/check/${id}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();

      // Check if SMS arrived
      if (data.sms && data.sms.length > 0) {
        return res.json({
          status: 'code_received',
          code: data.sms[0].code,
          full_sms: data.sms[0].text,
          sender: data.sms[0].sender,
          created_at: data.sms[0].created_at
        });
      } else {
        return res.json({
          status: 'waiting',
          message: 'الكود لم يصل بعد، قيد الانتظار'
        });
      }
    }

    if (site === 'man' || site === 'sms-man') {
      const response = await fetch(`http://api.sms-man.ru/stubs/handler_api.php?action=getStatus&api_key=${apiKey}&id=${id}`);
      const text = await response.text();
      // STATUS_OK:123456
      if (text.startsWith('STATUS_OK')) {
        const code = text.split(':')[1];
        return res.json({ status: 'code_received', code: code });
      } else if (text === 'STATUS_WAIT_CODE') {
        return res.json({ status: 'waiting', message: 'قيد انتظار وصول الكود' });
      } else {
        return res.json({ status: 'info', raw: text });
      }
    }

    return res.status(400).json({ error: 'الموقع غير مدعوم' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Cancel / Ban Real Number
app.post('/api/sms/cancel', async (req, res) => {
  try {
    const { site, apiKey, id } = req.body;
    if (!apiKey || !id) return res.status(400).json({ error: 'المعاملات ناقصة' });

    if (site === '5sim') {
      const response = await fetch(`https://5sim.biz/v1/user/ban/${id}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return res.json({ status: 'cancelled', data });
    }

    if (site === 'man' || site === 'sms-man') {
      const response = await fetch(`http://api.sms-man.ru/stubs/handler_api.php?action=setStatus&api_key=${apiKey}&id=${id}&status=-1`);
      const text = await response.text();
      return res.json({ status: 'cancelled', raw: text });
    }

    return res.status(400).json({ error: 'الموقع غير مدعوم' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Mount Vite middleware in development
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Real SMS Provider Server running on http://localhost:${PORT}`);
  });
}

startServer();
