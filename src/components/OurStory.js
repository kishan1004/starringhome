import ourStoryBg from "./../images/our-story.png";
import TypewriterEffect from "../utils/TypewriterEffect";
export default function OurStory() {
  return (
<div class="flex flex-col our-story-container lg:flex-row gap-8 p-4 mt-5 md:p-8 md:mx-10 items-stretch">
  <div class="lg:w-1/2 flex" >
    <img class="mt-3 w-full h-full object-cover ourstory-bg" data-aos="fade-right" src={ourStoryBg} alt="Our Story Background" />
  </div>
  
  <div class="lg:w-1/2 flex flex-col justify-center our-story-content" data-aos="fade-up">
    <h1 class=" text-4xl md:text-5xl lg:text-5xl">
      Our Story
    </h1>
    <div class="our-story-para mt-3">
      <p class="text-base sm:text-lg leading-relaxed">
      <TypewriterEffect text="Imagine the tale of a lone star wandering through the cosmos—quiet, patient, yet destined for a spectacular burst of light. It doesn’t shout to be seen; it simply shines when the time is right, transforming the space around it with effortless glow. In the tale of your journey, every twist and turn revolves around you, the protagonist, the star of the narrative. Each interaction with other characters shapes not only their destinies but also your own, leaving an indelible mark on the world around you."
       speed={7} />
      </p>
      <p class="mt-3 text-base sm:text-lg leading-relaxed">
      <TypewriterEffect 
        text="Introducing “Starring”! We believe that clothing is more than just fabric and stitching—it’s a reflection of individuals who embrace their inner protagonist to step into the spotlight with confidence and grace. Our pieces are designed not just to be worn but to elevate, to give every wearer the confidence to be the star of their own show."
        speed={7}
      />
        
      </p>
    </div>
  </div>
</div>

  
  );
}
