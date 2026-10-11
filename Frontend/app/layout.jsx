/* eslint-disable react-refresh/only-export-components */
import '../src/index.css';

export const metadata = {
  title: 'Hamza.dev | Full-Stack Engineer',
  description: 'Portfolio of Hamza Amir, a full-stack engineer building reliable digital products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
