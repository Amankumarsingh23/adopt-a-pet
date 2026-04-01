const fs = require("fs");
const path = require("path");

const PETS_FILE = path.join(__dirname, "pets.json");
const README_FILE = path.join(__dirname, "README.md");

function loadPets() {
  if (!fs.existsSync(PETS_FILE)) {
    return { pets: [], total_adoptions: 0 };
  }
  return JSON.parse(fs.readFileSync(PETS_FILE, "utf8"));
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toUTCString();
}

function generateReadme() {
  const data = loadPets();
  const { pets, total_adoptions } = data;

  const lastAdopter = pets.length > 0 ? pets[0] : null;

  // Build pet shelter grid (3 per row)
  let shelterSection = "";
  if (pets.length === 0) {
    shelterSection = `
> 🏚️ The shelter is empty... be the **first** to adopt a pet!

`;
  } else {
    // Group pets into rows of 3
    const rows = [];
    for (let i = 0; i < pets.length; i += 3) {
      rows.push(pets.slice(i, i + 3));
    }

    shelterSection = `\n`;

    for (const row of rows) {
      // Pet images row
      shelterSection += `| `;
      for (const pet of row) {
        shelterSection += `<img src="${pet.svg}" width="112" height="112" alt="${pet.type}"> | `;
      }
      // Fill empty cells if row is incomplete
      for (let i = row.length; i < 3; i++) {
        shelterSection += ` | `;
      }
      shelterSection += `\n`;

      // Table separator (only first row needs it)
      if (rows.indexOf(row) === 0) {
        shelterSection += `|:---:|:---:|:---:|\n`;
      }

      // Pet info row
      shelterSection += `| `;
      for (const pet of row) {
        const date = new Date(pet.timestamp);
        const shortDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        shelterSection += `**${pet.emoji} ${pet.name}**<br/>*${pet.personality}*<br/>Adopted by [@${pet.adopted_by}](https://github.com/${pet.adopted_by})<br/><sub>#${pet.issue_number} · ${shortDate}</sub> | `;
      }
      for (let i = row.length; i < 3; i++) {
        shelterSection += ` | `;
      }
      shelterSection += `\n`;
    }
  }

  // Stats bar
  const uniqueAdopters = [...new Set(pets.map((p) => p.adopted_by))].length;
  const petTypeCounts = pets.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});
  const mostPopular = Object.entries(petTypeCounts).sort((a, b) => b[1] - a[1])[0];

  const statsSection = pets.length > 0
    ? `
| 📊 Stat | Value |
|---|---|
| 🐾 Total Adoptions | **${total_adoptions}** |
| 👥 Unique Adopters | **${uniqueAdopters}** |
| 🏆 Most Popular Pet | **${mostPopular ? mostPopular[0] : "—"}** (${mostPopular ? mostPopular[1] : 0} adopted) |
| 🕐 Last Adoption | **${lastAdopter ? formatDate(lastAdopter.timestamp) : "—"}** |

`
    : ``;

  // Recent adopters list (top 5)
  const recentSection = pets.length > 0
    ? `\n### 🏅 Recent Adopters\n\n` +
      pets
        .slice(0, 5)
        .map(
          (p, i) =>
            `${i + 1}. [@${p.adopted_by}](https://github.com/${p.adopted_by}) adopted **${p.emoji} ${p.name}** the ${p.type}`
        )
        .join("\n") +
      `\n`
    : ``;

  const readme = `# 🐾 Adopt-a-Pet Shelter

> A living GitHub repository where anyone can adopt a pixel-art pet by opening an issue!

${
  lastAdopter
    ? `> 💌 **${lastAdopter.emoji} ${lastAdopter.name}** was last adopted by [@${lastAdopter.adopted_by}](https://github.com/${lastAdopter.adopted_by}) on ${formatDate(lastAdopter.timestamp)}.`
    : `> 🏡 No pets have been adopted yet — the shelter is waiting for you!`
}

---

## 🏡 The Shelter

${shelterSection}

---

## 📊 Shelter Stats

${statsSection}

${recentSection}

---

## 🐾 How to Adopt

1. **[Open a new Issue](../../issues/new)**
2. Set the title to exactly: \`Adopt!\`
3. Submit it — the GitHub Action will automatically:
   - Generate a random pixel-art pet 🎲
   - Give it a unique name and personality
   - Add it to the shelter with your username
   - Update this README

> ⏱️ Allow a few seconds/minutes for the workflow to complete.

---

## 🎨 Available Pets

| Pet | Emoji | Rarity |
|---|---|---|
| Cat | 🐱 | Common |
| Dog | 🐶 | Common |
| Bunny | 🐰 | Common |
| Frog | 🐸 | Uncommon |
| Hamster | 🐹 | Uncommon |
| Penguin | 🐧 | Uncommon |
| Axolotl | 🦎 | Rare |
| Dragon | 🐲 | Legendary |

---

## 📜 Rules

- One adoption per issue is fine — open as many as you want! 🎉
- Each pet is **randomly** generated — no two are the same name/personality combo
- All adopted pets live here **forever** in the shelter
- Pets are displayed newest-first

---

<sub>Built with ❤️ and pixel art · Inspired by <a href="https://github.com/Saviru/change-the-cat">change-the-cat</a> by @Saviru</sub>
`;

  fs.writeFileSync(README_FILE, readme);
  console.log(`✅ README.md generated (${pets.length} pets in shelter)`);
}

generateReadme();