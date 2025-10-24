# Vercel Deployment Fix

## 🚨 Muammo

Vercel hali ham `main` branch dan deploy qilmoqda va `vercel-build` script ni topa olmayapti.

## ✅ Yechim

### 1. Vercel Dashboard da Branch ni o'zgartiring

1. **Vercel Dashboard** ga kiring: [vercel.com](https://vercel.com)
2. **Loyihangizni tanlang**
3. **Settings** → **Git** bo'limiga o'ting
4. **Production Branch** ni `main` dan `dev` ga o'zgartiring
5. **Save** tugmasini bosing

### 2. Build Settings ni yangilang

**Settings** → **General** bo'limida:

- **Build Command**: `npm run build-storybook`
- **Output Directory**: `storybook-static`
- **Install Command**: `npm install`

### 3. Yoki vercel.json fayl ishlatiladi

`vercel.json` faylida quyidagi sozlamalar mavjud:

```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "npm install"
}
```

### 4. Dev branch ga push qiling

```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin dev
```

## 🔍 Tekshirish

1. Vercel Dashboard da **Deployments** bo'limiga o'ting
2. Eng so'nggi deployment `dev` branch dan bo'lishi kerak
3. Build log da `npm run build-storybook` ishlayotganini tekshiring

## 📝 Muhim eslatmalar

- Vercel avtomatik ravishda `vercel.json` faylini o'qiydi
- Agar manual sozlamalar qo'shgan bo'lsangiz, ular `vercel.json` ni override qiladi
- Branch ni o'zgartirgandan keyin yangi deployment bo'ladi

## 🆘 Agar hali ham muammo bo'lsa

1. Vercel Dashboard da **Settings** → **General** da barcha sozlamalarni tekshiring
2. **Build Command** da `npm run build-storybook` yozilganini tekshiring
3. **Output Directory** da `storybook-static` yozilganini tekshiring
4. **Production Branch** da `dev` yozilganini tekshiring
