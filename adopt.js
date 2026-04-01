const fs = require("fs");
const path = require("path");
const { generatePetSVG, getRandomPetType, getPetInfo } = require("./pets");

const PETS_FILE = path.join(__dirname, "pets.json");
const IMAGES_DIR = path.join(__dirname, "images");

// Load existing pets data
function loadPets() {
  if (!fs.existsSync(PETS_FILE)) {
    return { pets: [], total_adoptions: 0 };
  }
  return JSON.parse(fs.readFileSync(PETS_FILE, "utf8"));
}

// Save pets data
function savePets(data) {
  fs.writeFileSync(PETS_FILE, JSON.stringify(data, null, 2));
}

// Generate a unique pet name
function generatePetName() {
  const adjectives = [
    "Fluffy", "Tiny", "Brave", "Grumpy", "Cheerful", "Sleepy",
    "Bouncy", "Curious", "Gentle", "Sparky", "Dizzy", "Cozy",
    "Wiggly", "Snuggly", "Zesty", "Mellow", "Peppy", "Fuzzy",
    "Quirky", "Lively", "Spunky", "Dreamy", "Jolly", "Nimble",
  ];
  const nouns = [
    "Paws", "Whiskers", "Bubbles", "Noodle", "Mochi", "Pretzel",
    "Waffles", "Biscuit", "Pickle", "Dumpling", "Cupcake", "Jellybean",
    "Sprout", "Pebble", "Twinkle", "Cobalt", "Zigzag", "Pumpkin",
    "Marshmallow", "Cheddar", "Boba", "Churro", "Pudding", "Nacho",
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}

// Generate a fun personality trait
function generatePersonality() {
  const traits = [
    "loves midnight zoomies 🌙",
    "hoards shiny objects ✨",
    "demands belly rubs constantly 🤲",
    "judges you silently 👀",
    "only eats gourmet food 🍽️",
    "befriends all other pets 🤝",
    "scared of its own shadow 😱",
    "thinks it's the main character 🌟",
    "professional napper 😴",
    "chaos gremlin energy 😈",
    "too wholesome for this world 💖",
    "has strong opinions about snacks 🍪",
    "very dramatic about everything 🎭",
    "secretly runs a podcast 🎙️",
    "collects friendship bracelets 📿",
    "professional window watcher 🪟",
    "emotionally attached to a specific blanket 🛋️",
    "believes in you more than you do 💪",
  ];
  return traits[Math.floor(Math.random() * traits.length)];
}

// Main adoption function
async function adoptPet(username, issueNumber) {
  console.log(`🐾 Processing adoption for @${username} (Issue #${issueNumber})`);

  // Ensure images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // Load existing data
  const data = loadPets();

  // Generate new pet
  const petType = getRandomPetType();
  const petInfo = getPetInfo(petType);
  const petName = generatePetName();
  const personality = generatePersonality();
  const adoptionId = `pet_${Date.now()}`;
  const timestamp = new Date().toISOString();
  const svgFilename = `${adoptionId}.svg`;

  // Generate and save SVG
  const svgContent = generatePetSVG(petType, 14);
  fs.writeFileSync(path.join(IMAGES_DIR, svgFilename), svgContent);
  console.log(`✅ Generated SVG: ${svgFilename}`);

  // Create new pet record
  const newPet = {
    id: adoptionId,
    type: petType,
    emoji: petInfo.emoji,
    name: petName,
    personality,
    adopted_by: username,
    issue_number: issueNumber,
    timestamp,
    svg: `images/${svgFilename}`,
  };

  // Add to data
  data.pets.unshift(newPet); // newest first
  data.total_adoptions = (data.total_adoptions || 0) + 1;
  data.last_adoption = timestamp;

  // Save updated data
  savePets(data);
  console.log(`✅ Pet "${petName}" (${petInfo.emoji} ${petType}) adopted by @${username}`);

  return newPet;
}

// Export for workflow use
module.exports = { adoptPet, loadPets };

// Run directly if called as main
if (require.main === module) {
  const username = process.env.ADOPTER_USERNAME;
  const issueNumber = process.env.ISSUE_NUMBER;

  if (!username || !issueNumber) {
    console.error("❌ Missing ADOPTER_USERNAME or ISSUE_NUMBER env vars");
    process.exit(1);
  }

  adoptPet(username, issueNumber)
    .then((pet) => {
      console.log(`\n🎉 Adoption complete!`);
      console.log(`   Name: ${pet.name}`);
      console.log(`   Type: ${pet.emoji} ${pet.type}`);
      console.log(`   Personality: ${pet.personality}`);
      console.log(`   Adopted by: @${pet.adopted_by}`);
    })
    .catch((err) => {
      console.error("❌ Adoption failed:", err);
      process.exit(1);
    });
}