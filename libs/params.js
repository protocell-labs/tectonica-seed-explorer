//////PARAMS//////


// color palettes inspirations

// "horizon, sunshine, grapefruit": Otti Berger, Gunta Stölzl, Anni Albers, Marianne Brandt, Benita Koch-Otte, Gertrude Arndt, Alma Siedhoff-Buscher, Margarete Heymann
// "night, embers, citrus": Ludwig Mies van der Rohe, Marcel Breuer, Walter Gropius, Le Corbusier
// "ivy, apatite, tourmaline": Georgia O'Keeffe, Salvador Dalí, Henri Matisse, Wassily Kandinsky, Marc Chagall, Almada Negreiros, Pablo Picasso, Paul Klee
// "sodalite, glacier, rust": Max Planck, Sir Joseph John Thomson, Albert Einstein, Werner Heisenberg, Niels Bohr, Richard Feynman, Paul Dirac
// "ocean, lapis, sulphur": Charles Babbage, Ada Lovelace, Gottfried Wilhelm Leibniz, George Boole
// "moss, cedar, algae": Zancan, John Muir, Henry David Thoreau
// "ink, steel, salt": Katsushika Hokusai, Utagawa Hiroshige
// "charcoal, papyrus, marble": charcoal, marble, Ansel Adams, New York Times
// "murex, rhodochrosite, marshmallow": Marvin Minsky, Allen Newell, Herbert A. Simon, John McCarthy, Ray Solomonoff, Claude Shannon, John von Neumann, Alan Turing
// "furnace, ruby, soot": Anish Kapoor, Kjetil Golid, Kwame Bruce Busia, Donald Judd, Kazimir Malevich

// palette encoding based on "Code-golfing color palettes in JavaScript"
// from: https://gist.github.com/mattdesl/58b806478f4d33e8b91ed9c51c39014d

const pigment_codes = {
  "horizon, sunshine, grapefruit":      ["૟࿾྅࿥:ుඡɘ໭:࿽ณɺྱ:ο࿭ླ༤:๒າқ࿽ߌ:ศຳ͚໭:ະแɩ໌໮:ย࿂ƛྫ࿭", ["Otti", "Stölzl", "Albers", "Brandt", "Koch-Otte", "Arndt", "Siedhoff-Buscher", "Heymann"]],
  "night, embers, citrus":              ["གྷ࿖ɗ࿿đ:ྰึɺ࿽đ:࿽ณɺྱđ:ག࿀Ҍ࿽đ", ["van der Rohe", "Breuer", "Gropius", "Le Corbusier"]],
  "ivy, apatite, tourmaline":           ["Dྗ໚֊:ไཱུ࿆࿶ǌ:­h࿀࿽഑:ྰึɺΖ࿽:ྠŪ໭โ:࿍࿢ʽڃ๧࿾:༷໓їƩ໭:റඓu໊ࢗު", ["O'Keeffe", "Dalí", "Matisse", "Kandinsky", "Chagall", "Negreiros", "Picasso", "Klee"]],
  "sodalite, glacier, rust":            ["࿾റɇđ:Ņ໾ѩབ:໬ೋȤข:࿿ฒงZ׎:ྚIƌޮ૝࿿:Iպངྻ࿾:ൄ෮ͩȵ્", ["Planck", "Thomson", "Einstein", "Heisenberg", "Bohr", "Feynman", "Dirac"]],
  "ocean, lapis, sulphur":              ["ĺɈɽڭ࿕:෿¿Y$:࿿૭ŭȤ࿒:đŘ࿃࿨৉", ["Babbage", "Lovelace", "Leibniz", "Boole" ]],
  "moss, cedar, algae":                 ["ђރவȡ࿿:೉Փ͂Ȳ:ŅƖࣙ೛࿭", ["Zancan", "Muir", "Thoreau"]],
  "ink, steel, salt":                   ["ޚ಺ොĤф:໬ȵĤĒ", ["Hokusai", "Hiroshige"]],
  "charcoal, papyrus, marble":          ["đđȢȢ̳:ೋ໬࿽໭࿿࿭:໬Ȣđ:໬ೋđ", ["Charcoal", "Marble", "Adams", "New York Times"]],
  "murex, rhodochrosite, marshmallow":  ["೯ཙ࿎࿮:ࠍഫྌ࿆໮:ĶԷ࠷ཇ࿽:κߊේྙ༷:๹ۍࡨ࿿:٘ޚඊ࿋:Ђԃ܅अ࿽:ขุщđ໭", ["Minsky", "Newell", "Simon", "McCarthy", "Solomonoff", "Shannon", "von Neumann", "Turing"]],
  "furnace, ruby, soot":                ["ःఃན࿀࿽:࿄໭ནྛ:࿽ณđ:ณขറ༤โฒྠྱ྅đ:໭ณđ࿌", ["Kapoor", "Golid", "Busia", "Judd", "Malevich"]]
};

const allel_pigments = [
  ["horizon, sunshine, grapefruit", 8],
  ["night, embers, citrus", 4],
  ["ivy, apatite, tourmaline", 8],
  ["sodalite, glacier, rust", 7],
  ["ocean, lapis, sulphur", 4],
  ["moss, cedar, algae", 3],
  ["ink, steel, salt", 2],
  ["charcoal, papyrus, marble", 4],
  ["murex, rhodochrosite, marshmallow", 8],
  ["furnace, ruby, soot", 5]
];

const allel_pattern = [
  ["noisy", 2],
  ["graded", 3],
  ["layered", 3], 
  ["stacked", 1], 
  ["composed", 2]
];

const allel_dimension = [
  ["voxel", 2],
  ["pin", 3],
  ["stick", 3],
  ["needle", 3],
  ["wire", 1]
];

const allel_structure = [
  ["cracks", 1],
  ["bands", 1],
  ["sheets", 1],
  ["unbiased", 3]
];

const allel_form = [
  ["expressive", 9],
  ["monolithic", 1]
];

const allel_dissipation = [
  ["clean", 3],
  ["fuzzy", 1]
];

const allel_attachment = [
  ["tight", 80],
  ["detached", 10],
  ["loose", 5],
  ["floating", 5]
];





const pigments = [
  "ALL", // 0
  "horizon, sunshine, grapefruit", // 1
  "night, embers, citrus", // 2
  "ivy, apatite, tourmaline", // 3
  "sodalite, glacier, rust", // 4
  "ocean, lapis, sulphur", // 5
  "moss, cedar, algae", // 6
  "ink, steel, salt", // 7
  "charcoal, papyrus, marble", // 8
  "murex, rhodochrosite, marshmallow", // 9
  "furnace, ruby, soot"]; // 10

const patterns = [
  "ALL", // 0
  "noisy", // 1
  "graded", // 2
  "layered", // 3
  "stacked",  // 4
  "composed"]; // 5

const dimensions = [
  "ALL", // 0
  "voxel", // 1
  "pin", // 2
  "stick", // 3
  "needle", // 4
  "wire"]; // 5

const structures = [
  "ALL", // 0
  "cracks", // 1
  "bands", // 2
  "sheets", // 3
  "unbiased"]; // 4

const forms = [
  "ALL", // 0
  "expressive", // 1
  "monolithic"]; // 2

const dissipations = [
  "ALL", // 0
  "clean", // 1
  "fuzzy"]; // 2

const attachments = [
  "ALL", // 0
  "tight", // 1
  "detached", // 2
  "loose", // 3
  "floating"]; // 4




var examples = {
  
  "horizon, sunshine, grapefruit": [],
  "night, embers, citrus": [],
  "ivy, apatite, tourmaline": [],
  "sodalite, glacier, rust": [],
  "ocean, lapis, sulphur": [],
  "moss, cedar, algae": [],
  "ink, steel, salt": [],
  "charcoal, papyrus, marble": [],
  "murex, rhodochrosite, marshmallow": [],
  "furnace, ruby, soot": [],
  
  "noisy": [],
  "graded": [],
  "layered": [],
  "stacked": [],
  "composed": [],
  
  "voxel": [],
  "pin": [],
  "stick": [],
  "needle": [],
  "wire": [],
  
  "cracks": [],
  "bands": [],
  "sheets": [],
  "unbiased": [],
  
  "expressive": [],
  "monolithic": [],
  
  "clean": [],
  "fuzzy": [],
  
  "tight": [],
  "detached": [],
  "loose": [],
  "floating": []
  
};





// pigments_idx, pattern_idx, dimension_idx, structure_idx, form_idx, dissipation_idx, attachment_idx;

var example_features = [
  
  // grouped by pigment
  ["tectonica_charcoal_01.jpg", [8, 3, 3, 3, 1, 1, 1]],
  ["tectonica_charcoal_02.jpg", [8, 3, 2, 1, 1, 2, 1]],
  ["tectonica_charcoal_03.jpg", [8, 2, 4, 2, 1, 1, 1]],
  ["tectonica_charcoal_04.jpg", [8, 2, 2, 1, 1, 1, 1]],
  ["tectonica_charcoal_07.jpg", [8, 1, 3, 3, 1, 2, 1]],
  ["tectonica_charcoal_09.jpg", [8, 4, 1, 2, 1, 1, 1]],
  ["tectonica_furnace_01.jpg", [10, 3, 2, 4, 1, 2, 1]],
  ["tectonica_furnace_02.jpg", [10, 2, 1, 2, 1, 1, 1]],
  ["tectonica_furnace_05.jpg", [10, 2, 4, 3, 1, 1, 1]],
  ["tectonica_furnace_09.jpg", [10, 5, 3, 4, 1, 1, 1]],
  ["tectonica_furnace_11.jpg", [10, 3, 2, 4, 1, 2, 1]],
  ["tectonica_furnace_12.jpg", [10, 3, 3, 2, 1, 2, 1]],
  ["tectonica_horizon_02.jpg", [1, 4, 4, 2, 1, 1, 1]],
  ["tectonica_horizon_03.jpg", [1, 3, 2, 2, 1, 2, 1]],
  ["tectonica_horizon_04.jpg", [1, 1, 4, 3, 1, 2, 1]],
  ["tectonica_horizon_07.jpg", [1, 3, 5, 4, 1, 2, 1]],
  ["tectonica_horizon_10.jpg", [1, 3, 2, 2, 1, 1, 1]],
  ["tectonica_horizon_12.jpg", [1, 2, 1, 1, 1, 2, 1]],
  ["tectonica_ink_01.jpg", [7, 5, 3, 3, 1, 2, 1]],
  ["tectonica_ink_02.jpg", [7, 1, 1, 2, 1, 2, 1]],
  ["tectonica_ink_04.jpg", [7, 5, 1, 4, 1, 1, 1]],
  ["tectonica_ink_06.jpg", [7, 3, 5, 3, 1, 2, 1]],
  ["tectonica_ink_08.jpg", [7, 4, 1, 3, 1, 1, 1]],
  ["tectonica_ink_10.jpg", [7, 3, 1, 3, 1, 1, 1]],
  ["tectonica_ivy_01.jpg", [3, 3, 5, 1, 1, 1, 1]],
  ["tectonica_ivy_02.jpg", [3, 1, 4, 3, 1, 1, 1]],
  ["tectonica_ivy_03.jpg", [3, 3, 2, 3, 1, 2, 1]],
  ["tectonica_ivy_04.jpg", [3, 3, 1, 3, 1, 1, 1]],
  ["tectonica_ivy_05.jpg", [3, 2, 2, 1, 1, 1, 1]],
  ["tectonica_ivy_10.jpg", [3, 5, 3, 3, 1, 2, 1]],
  ["tectonica_moss_05.jpg", [6, 3, 2, 1, 1, 1, 1]],
  ["tectonica_moss_06.jpg", [6, 3, 2, 3, 1, 2, 1]],
  ["tectonica_moss_08.jpg", [6, 2, 2, 2, 1, 2, 1]],
  ["tectonica_moss_10.jpg", [6, 1, 4, 2, 1, 1, 1]],
  ["tectonica_moss_11.jpg", [6, 2, 1, 1, 1, 2, 1]],
  ["tectonica_moss_12.jpg", [6, 4, 2, 4, 1, 1, 1]],
  ["tectonica_murex_01.jpg", [9, 2, 2, 2, 1, 2, 1]],
  ["tectonica_murex_04.jpg", [9, 4, 3, 4, 1, 1, 1]],
  ["tectonica_murex_05.jpg", [9, 1, 5, 3, 1, 1, 1]],
  ["tectonica_murex_09.jpg", [9, 3, 3, 3, 1, 1, 1]],
  ["tectonica_murex_11.jpg", [9, 3, 4, 4, 1, 2, 1]],
  ["tectonica_murex_12.jpg", [9, 2, 1, 1, 1, 2, 1]],
  ["tectonica_night_01.jpg", [2, 2, 1, 3, 1, 2, 1]],
  ["tectonica_night_04.jpg", [2, 3, 5, 2, 1, 1, 1]],
  ["tectonica_night_05.jpg", [2, 4, 3, 2, 1, 1, 1]],
  ["tectonica_night_07.jpg", [2, 2, 1, 3, 1, 1, 1]],
  ["tectonica_night_08.jpg", [2, 2, 2, 4, 1, 1, 1]],
  ["tectonica_night_12.jpg", [2, 3, 4, 2, 1, 2, 1]],
  ["tectonica_ocean_02.jpg", [5, 2, 5, 2, 1, 1, 1]],
  ["tectonica_ocean_03.jpg", [5, 2, 2, 3, 1, 1, 1]],
  ["tectonica_ocean_04.jpg", [5, 1, 1, 4, 1, 2, 1]],
  ["tectonica_ocean_09.jpg", [5, 3, 1, 2, 1, 2, 1]],
  ["tectonica_ocean_10.jpg", [5, 3, 2, 2, 1, 1, 1]],
  ["tectonica_ocean_12.jpg", [5, 2, 3, 4, 1, 1, 1]],
  ["tectonica_sodalite_01.jpg", [4, 2, 1, 3, 1, 1, 1]],
  ["tectonica_sodalite_03.jpg", [4, 5, 2, 1, 1, 2, 1]],
  ["tectonica_sodalite_05.jpg", [4, 5, 2, 3, 1, 1, 1]],
  ["tectonica_sodalite_07.jpg", [4, 1, 2, 1, 1, 2, 1]],
  ["tectonica_sodalite_08.jpg", [4, 2, 5, 2, 1, 1, 1]],
  ["tectonica_sodalite_10.jpg", [4, 3, 2, 1, 1, 1, 1]],
  
  // extra
  ["tectonica_detached_02.jpg", [3, 5, 5, 2, 1, 2, 2]],
  ["tectonica_detached_04.jpg", [3, 1, 4, 2, 1, 1, 2]],
  ["tectonica_detached_05.jpg", [3, 5, 2, 4, 1, 2, 2]],
  ["tectonica_detached_07.jpg", [3, 3, 2, 4, 1, 2, 2]],
  ["tectonica_detached_09.jpg", [3, 3, 1, 3, 1, 2, 2]],
  ["tectonica_detached_11.jpg", [3, 2, 3, 4, 1, 2, 2]],
  ["tectonica_floating_02.jpg", [3, 4, 1, 2, 1, 1, 4]],
  ["tectonica_floating_03.jpg", [3, 3, 2, 3, 1, 2, 4]],
  ["tectonica_floating_04.jpg", [3, 3, 5, 2, 1, 1, 4]],
  ["tectonica_floating_07.jpg", [3, 3, 4, 3, 1, 2, 4]],
  ["tectonica_floating_10.jpg", [3, 2, 3, 4, 1, 2, 4]],
  ["tectonica_floating_12.jpg", [3, 1, 4, 2, 1, 2, 4]],
  ["tectonica_loose_02.jpg", [3, 2, 2, 3, 1, 1, 3]],
  ["tectonica_loose_05.jpg", [3, 3, 4, 3, 1, 2, 3]],
  ["tectonica_loose_06.jpg", [3, 1, 2, 1, 1, 1, 3]],
  ["tectonica_loose_07.jpg", [3, 3, 3, 4, 1, 2, 3]],
  ["tectonica_loose_10.jpg", [3, 1, 2, 4, 1, 2, 3]],
  ["tectonica_loose_11.jpg", [3, 1, 1, 4, 1, 1, 3]],
  ["tectonica_monolithic_02.jpg", [3, 3, 4, 2, 2, 2, 1]],
  ["tectonica_monolithic_04.jpg", [3, 1, 3, 4, 2, 1, 1]],
  ["tectonica_monolithic_05.jpg", [3, 3, 3, 3, 2, 1, 1]],
  ["tectonica_monolithic_08.jpg", [3, 4, 2, 4, 2, 1, 1]],
  ["tectonica_monolithic_11.jpg", [3, 2, 2, 1, 2, 1, 1]],
  ["tectonica_monolithic_12.jpg", [3, 3, 1, 3, 2, 1, 1]]
  
];



