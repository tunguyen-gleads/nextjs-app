import localFont from 'next/font/local';
import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const TransformaSans = localFont({
  variable: '--font-transforma-sans',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/TransformaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    // Thêm các font weights khác nếu cần
    {
      path: '../public/fonts/TransformaSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-Extralight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/TransformaSans-ExtraBlack.ttf',
      weight: '950',
      style: 'normal',
    },
  ],
});
