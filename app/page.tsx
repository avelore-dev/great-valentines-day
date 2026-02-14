import ValentineCard from '../components/OpeningCard';

export const metadata = {
  title: 'С Днём Святого Валентина 💕',
  description: 'Романтичная валентинка для моей любимой',
  openGraph: {
    title: 'С Днём Святого Валентина',
    description: 'Особенное послание любви',
    images: ['/image.png'],
  },
};

export default function Home() {
  return <ValentineCard />;
}