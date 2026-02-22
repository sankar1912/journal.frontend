import Image from "next/image";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import AboutSection from "./About";
import ResearcherCard from "./ResearcherCard";


const food = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320]
];

export default function HomePage() {
  return (
    <>
    <Navbar/>
      <HeroSection
  title="Journal Hub"
  subtitle="A peaceful and focused space to capture your thoughts, ideas, and reflections. Write your story, track your growth, and revisit your cherished memories."
   imagePrimary=""/*"https://images.pexels.com/photos/4015752/pexels-photo-4015752.jpeg"*/
  imageSecondary="https://images.pexels.com/photos/35439515/pexels-photo-35439515.jpeg"
/>

      <AboutSection/>
      <ResearcherCard/>
      
      {/* <div style={{
            margin: '100px auto',
            maxWidth: '500px',
            paddingBottom: '100px',
          }}>
      {food.map(([emoji, hueA, hueB]) => (
        <Card 
          key={emoji} 
          emoji={emoji} 
          hueA={hueA} 
          hueB={hueB} 
        />
      ))}
      </div> */}
      {/* Page content */}
      <div style={{ height: '200vh' }} />
    </>
  );
}
