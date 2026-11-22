/**
 * Every fact on the site lives here. Items marked VERIFY are reasonable
 * defaults that the clinic should confirm before launch.
 */
export const site = {
  name: "Vishal Dental",
  legalName: "Vishal Dental & Implant Centre",
  doctor: "Dr. Vishal",
  qualification: "MDS",
  speciality: "Oral & Maxillofacial Surgeon",
  description:
    "Dental implants, root canals, maxillofacial surgery, full-mouth rehabilitation, cosmetic and children's dentistry in Thudiyalur, Coimbatore — led by Dr. Vishal, MDS, Oral & Maxillofacial Surgeon.",
  // VERIFY: replace with the real domain once bought.
  url: "https://vishal-dental.onrender.com",
  address: {
    lines: ["City Building, HF 2, Subramaniya Layout", "Rukkammal Colony, Thudiyalur", "Coimbatore, Tamil Nadu 641034"],
    short: "Thudiyalur, Coimbatore",
    landmark: "About 100 m from Vishwanathapuram bus stop",
    mapQuery: "Vishal Dental & Implant Centre, Subramaniya Layout, Thudiyalur, Coimbatore 641034",
  },
  phones: [{ display: "+91 70104 01746", href: "+917010401746" }],
  // VERIFY: assumes the clinic number is on WhatsApp.
  whatsapp: "917010401746",
};

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
export const whatsappLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: "Treatments", href: "#treatments" },
  { label: "Implants", href: "#implants" },
  { label: "Smile", href: "#smile" },
  { label: "Doctor", href: "#doctor" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit", href: "#visit" },
];

export type IconKey = "implant" | "canal" | "jaw" | "arch" | "sparkle" | "kid" | "bolt";

export const treatments: {
  id: string;
  name: string;
  icon: IconKey;
  line: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "implants",
    name: "Dental implants",
    icon: "implant",
    line: "A fixed tooth that feels like your own.",
    body: "A titanium post replaces the lost root, then a custom crown sits on top. Surgically planned and placed by an oral & maxillofacial surgeon.",
    points: ["Single & multiple teeth", "Implant-supported bridges", "Bone & gum assessment"],
  },
  {
    id: "rct",
    name: "Root canal treatment",
    icon: "canal",
    line: "Save the tooth, stop the pain.",
    body: "Infected pulp is cleaned out, the canals are sealed and the tooth is protected with a crown, so you keep your natural tooth.",
    points: ["Relief from toothache", "Gentle, numbed procedure", "Crown to protect the tooth"],
  },
  {
    id: "maxfac",
    name: "Maxillofacial surgery",
    icon: "jaw",
    line: "Specialist surgery for the jaw and face.",
    body: "Wisdom teeth, impacted teeth, cysts, jaw injuries and other procedures of the mouth, jaw and face — the doctor's core speciality.",
    points: ["Wisdom tooth removal", "Impacted & complex extractions", "Jaw & facial injuries"],
  },
  {
    id: "fmr",
    name: "Full-mouth rehabilitation",
    icon: "arch",
    line: "Rebuild bite, comfort and confidence.",
    body: "For many worn, broken or missing teeth: one planned course that restores how your teeth fit, chew and look together.",
    points: ["Crowns, bridges & implants", "Bite correction", "Step-by-step treatment plan"],
  },
  {
    id: "cosmetic",
    name: "Cosmetic dentistry",
    icon: "sparkle",
    line: "A brighter, more even smile.",
    body: "Whitening, tooth-coloured fillings, veneers and smile makeovers, planned around your face and the shade that suits you.",
    points: ["Teeth whitening", "Veneers & smile design", "Tooth-coloured fillings"],
  },
  {
    id: "kids",
    name: "Children's dentistry",
    icon: "kid",
    line: "Calm, friendly care for little teeth.",
    body: "Check-ups, fillings and preventive care for children, at a pace that keeps them relaxed — and builds good habits early.",
    points: ["First dental visits", "Fillings & preventive care", "Habit & brushing guidance"],
  },
  {
    id: "emergency",
    name: "Emergency care",
    icon: "bolt",
    line: "Sudden pain, swelling or a broken tooth?",
    body: "Call the clinic straight away. We'll tell you what to do right now and see you as soon as possible.",
    points: ["Severe toothache", "Broken or knocked-out tooth", "Swelling & infection"],
  },
];

export const implantStages = [
  { title: "Titanium post", body: "Placed into the jawbone, where it bonds with the bone over the following weeks — a new, stable root." },
  { title: "Abutment", body: "A small connector fixed on the post. It holds the new tooth firmly and exactly in line." },
  { title: "Ceramic crown", body: "Custom-made and shade-matched to your neighbouring teeth, then fixed onto the abutment." },
  { title: "Your new tooth", body: "Bite, chew and smile as you did before. It doesn't move and it isn't removed at night." },
];

export const visitSteps = [
  { title: "Consult", body: "Tell us what's bothering you. Dr. Vishal examines your teeth and gums and takes any X-rays needed." },
  { title: "Plan", body: "You get clear options, how long each takes and what it costs — before anything starts." },
  { title: "Treat", body: "Unhurried, numbed and explained step by step, so there are no surprises in the chair." },
  { title: "Aftercare", body: "Simple instructions, follow-up reviews and a number you can call if anything feels wrong." },
];

export const faqs = [
  {
    q: "Is getting a dental implant painful?",
    a: "The area is numbed, so most people feel pressure rather than pain during the procedure. Mild soreness for a few days afterwards is normal and is usually managed with simple medication.",
  },
  {
    q: "How long does an implant take from start to finish?",
    a: "It depends on your bone and gum health. Typically the post is given time to bond with the bone before the final crown is fixed. Dr. Vishal will give you a timeline at your consultation.",
  },
  {
    q: "Will a root canal hurt?",
    a: "A root canal is done under local anaesthesia and is meant to relieve the pain of an infected tooth, not cause it. Many patients say it feels like getting a filling.",
  },
  {
    q: "Do you treat children?",
    a: "Yes. We see children for check-ups, fillings and preventive care, and take our time so they stay comfortable.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call the clinic right away. For a knocked-out tooth, hold it by the crown (not the root), keep it moist in milk and come in as quickly as you can.",
  },
  {
    q: "Do I need an appointment?",
    a: "Booking ahead means less waiting. Send us a WhatsApp message or call during clinic hours and we'll find you a slot.",
  },
];
