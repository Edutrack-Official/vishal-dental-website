import { Hero } from "@/components/sections/hero";
import { Treatments } from "@/components/sections/treatments";
import { ImplantStory } from "@/components/sections/implant-story";
import { Smile } from "@/components/sections/smile";
import { Doctor } from "@/components/sections/doctor";
import { Steps } from "@/components/sections/steps";
import { Faq } from "@/components/sections/faq";
import { Visit } from "@/components/sections/visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Treatments />
      <ImplantStory />
      <Smile />
      <Doctor />
      <Steps />
      <Faq />
      <Visit />
    </>
  );
}
