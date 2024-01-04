//////UTILS//////

// rand functions for random generator. Assumes generator producing float point between 0 and 1

function gene_rand_int_proto(gene){
  function gene_rand_int(min,max){
    return Math.floor((gene() * (max-min)) + min);
  }
  return gene_rand_int;
}

function gene_range_proto(gene){
  function gene_range(min, max){
    return (gene() * (max - min)) + min;
  }
  return gene_range;
}

function gene_pick_n_proto(gene){
  function gene_pick_n(min, max, n){
    var unique_list = [];
    for (var i = 0; i < n; i++) {
      unique_list.push(Math.floor((gene() * (max-min)) + min));
    }
    return unique_list;
  }
  return gene_pick_n;
}

function gene_weighted_choice_proto(gene){
  function gene_weighted_choice(data){
    let total = 0;
    for (let i = 0; i < data.length; ++i) {
        total += data[i][1];
    }
    const threshold = gene() * total;
    total = 0;
    for (let i = 0; i < data.length - 1; ++i) {
        total += data[i][1];
        if (total >= threshold) {
            return data[i][0];
        }
    }
    return data[data.length - 1][0];
  }
return gene_weighted_choice;
}

// choose a random property name (key) from an object
function gene_pick_key_proto(gene) {
  function gene_pick_key(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * gene() << 0];
  }
  return gene_pick_key;
}

// choose a random property from an object
function gene_pick_property_proto(gene) {
  function gene_pick_property(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * gene() << 0]];
  }
  return gene_pick_property;
}

// randomize array in-place using Durstenfeld shuffle algorithm, an optimized version of Fisher-Yates
function shuffleArray_proto(gene) {
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(gene() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
return shuffleArray;
}







function sigmoid(z, k) {
  return 1 / (1 + Math.exp(-z/k));
}

// calculates a number between two numbers at a specific increment
// noise culling is working differently if we remove this function !!! (leave it in for tectonica)
function lerp_a2b(start, end, amt){
  return (1 - amt) * start + amt * end;
}

function shiftArrayCopy(arr){
  arrCopy = [...arr];
  let last = arrCopy.pop();
  arrCopy.unshift(last);
  return arrCopy;
}






/**
 * Resize the image to a new width and height using nearest neighbor algorithm.
 * To make the image scale proportionally, use 0 as the value for the wide or high parameters.
 * Note: Disproportionate resizing squashes the "pixels" from squares to rectangles.
 * This works about 10 times slower than the regular resize.
 */

// https://GitHub.com/processing/p5.js/issues/1845
// https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c
// GitHub GoToLoop/resizeNN.js

p5.Image.prototype.resizeNN = function (w, h) {
  "use strict";
  const { width, height } = this.canvas; // Locally cache current image's canvas' dimension properties
  w = ~~Math.abs(w), h = ~~Math.abs(h); // Sanitize dimension parameters
  if (w === width && h === height || !(w | h)) return this; // Quit prematurely if both dimensions are equal or parameters are both 0
  // Scale dimension parameters:
  w || (w = h * width / height | 0); // when only parameter w is 0
  h || (h = w * height / width | 0); // when only parameter h is 0
  const img = new p5.Image(w, h), // creates temporary image
    sx = w / width, sy = h / height; // scaled coords. for current image
  this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]
  // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
  const pixInt = new Int32Array(this.pixels.buffer),
    imgInt = new Int32Array(img.pixels.buffer);
  // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once
  for (let y = 0; y < h;) {
    const curRow = width * ~~(y / sy), tgtRow = w * y++;
    for (let x = 0; x < w;) {
      const curIdx = curRow + ~~(x / sx), tgtIdx = tgtRow + x++;
      imgInt[tgtIdx] = pixInt[curIdx];
    }
  }
  img.updatePixels(); // updates temporary 8-bit RGBa pixels[] w/ its current state
  // Resize current image to temporary image's dimensions
  this.canvas.width = this.width = w, this.canvas.height = this.height = h;
  this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);
  return this;
};








function generate_seeds() {
  
  // used for testing
  //minter = "0x28c7944c36a3ac5131b295fd9d3c15bb7ffedc96";
  
  for (let i = 0; i < nr_of_seeds; i++) {
    var seed_features = calculate_seed_features(i, minter)
    all_seeds.push(seed_features);
  }
  
  // seed filtering
  
  apply_seed_filtering();
  
  // calculate size of the target grid based on the screen size
  
  grid_nr_x = Math.floor(windowWidth / grid_cell_size_x) - grid_nr_x_offset * 2;
  grid_nr_y = Math.floor(nr_of_thumbnails / grid_nr_x);
  
  previous_grid_nr_x = grid_nr_x;
  previous_grid_nr_y = grid_nr_y;
  
  // selection buttons
  
  offset_bottom = 100;
  button_width = 150;
  button_height = 25;
  next_button_offset = windowWidth / 7;
  
  // create target grid (positions grid is already created before)
  
  target_grid = calculate_regular_grid(grid_nr_x, grid_nr_y, grid_cell_size_x, grid_cell_size_y);
  
  target_grid = translate_grid(target_grid, windowWidth / 2 - (grid_nr_x - 1) * grid_cell_size_x / 2, windowHeight / 2 - (grid_nr_y - 1) * grid_cell_size_y / 2);
  
}








function calculate_seed_features(seed, minter) {

  let artwork_seed = minter + "_seed_" + seed.toString(); // artwork seed is composed of minter wallet address and chosen effect number
  const gene = new Math.seedrandom(artwork_seed); // seeded PRNG for general use

  // random functions seeded with artwork_seed
  const gene_rand_int = gene_rand_int_proto(gene);
  const gene_range = gene_range_proto(gene);
  const gene_pick_n = gene_pick_n_proto(gene);
  const gene_weighted_choice = gene_weighted_choice_proto(gene);
  const gene_pick_key = gene_pick_key_proto(gene);
  const gene_pick_property = gene_pick_property_proto(gene);
  const shuffleArray = shuffleArray_proto(gene)

  // global parameters
  var pigments = gene_weighted_choice(allel_pigments); // choose pigments with probability proportional to the number of palettes in them (so each color palette has an equal probability of being chosen later)
  var chosen_code = pigment_codes[pigments][0]; // palette code is picked based on the pigment name
  var decoded_palettes = chosen_code.split(":").map(s=>s.split("").map(k=>'#'+`00${k.charCodeAt(0).toString(16)}`.slice(-3))); // decode pigment code into a set of palettes
  var palette_idx = gene_rand_int(0, decoded_palettes.length); // choose random number as a palette index - equal probability
  var chosen_palette = decoded_palettes[palette_idx]; // choose palette based on the index number
  var palette_name =  pigment_codes[pigments][1][palette_idx]; // choose corresponding palette name from a list (matched with a palette through ordering)
  shuffleArray(chosen_palette); // randomly shuffle the colors in the palette - this way we can keep the order of probabilities the same in the loop below

  var pattern = gene_weighted_choice(allel_pattern);
  var noise_feature = gene_weighted_choice(allel_structure); // overall structure of elements determined by non-uniform scaling of noise
  var noise_form = gene_weighted_choice(allel_form); // expressive vs monolithic
  var noise_cull_rule = gene_weighted_choice(allel_dissipation); // clean vs fuzzy edges
  var dimension_type = gene_weighted_choice(allel_dimension); // size of elements
  var attachment_type = gene_weighted_choice(allel_attachment); // gap between the vertical layers

  
  // create a thumbnail
  var thumbnail_image = create_thumbnail(pigments, palette_name, chosen_palette, pattern, dimension_type, noise_feature, noise_form, noise_cull_rule, attachment_type);
  
  
  // create seed object to return
  var seed_features = {seed: seed,
                      pigments: pigments,
                      palette_name: palette_name,
                      palette: chosen_palette,
                      pattern: pattern,
                      dimension: dimension_type,
                      structure: noise_feature,
                      form: noise_form,
                      dissipation: noise_cull_rule,
                      attachment: attachment_type,
                      thumbnail: thumbnail_image};
  
  return seed_features;
}





function create_thumbnail(pigments, 
                          palette_name, 
                          chosen_palette, 
                          pattern, 
                          dimension_type, 
                          noise_feature, 
                          noise_form, 
                          noise_cull_rule, 
                          attachment_type) {
  
  
  const gene = new Math.seedrandom("0"); // seeded PRNG
  const gene_weighted_choice = gene_weighted_choice_proto(gene);
  const gene_rand_int = gene_rand_int_proto(gene);
  
  var card_width = 18; // 16:9 aspect ratio
  var card_height = 32; // 16:9 aspect ratio
  
  
  var x_step, y_step;
  
  if (dimension_type == "voxel") {
    x_step = 2;
    y_step = 2;
    
  } else if (dimension_type == "pin") {
    x_step = 2;
    y_step = 4;
  
  } else if (dimension_type == "stick") {
    x_step = 1;
    y_step = 4;
  
  } else if (dimension_type == "needle") {
    x_step = 1;
    y_step = 8;
    
  } else if (dimension_type == "wire") {
    x_step = 1;
    y_step = 16;
    
  }
    
  var offset_x = x_step / 2;
  var offset_y = y_step / 2;
  var nr_in_width = Math.floor(card_width / x_step);
  var nr_in_height = Math.floor(card_height / y_step);
  
  var thumbnail = createGraphics(card_width, card_height);
  thumbnail.noStroke();
  thumbnail.rectMode(CENTER);
  thumbnail.background(0,0,0);
  
  var ascending_param, descending_param, palette_probs, idx;
  var lng = chosen_palette.length;
  
  for (var i = 0; i < nr_in_width; i++) {
    for (var j = 0; j < nr_in_height; j++) {
      
      if (pattern == "noisy") {
        palette_probs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

      } else if (pattern == "graded") {
        ascending_param = j;
        descending_param = nr_in_height - j;
        palette_probs = [ascending_param, descending_param, 1, 1, 1, 1, 1, 1, 1, 1];
        
      } else if (pattern == "layered") {
        palette_probs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if ((i > nr_in_width / 2) && (j > nr_in_width / 2)) {idx = 0;}
        else {idx = Math.min(i,j) % lng;}
        palette_probs[idx] = 1;
        
      } else if (pattern == "stacked") {
        palette_probs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        idx = j % lng;
        palette_probs[idx] = 1;
        
      } else if (pattern == "composed") {
        palette_probs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if ((i < nr_in_width / 2) && (j < nr_in_height / 2)) {idx = j % lng;}
        else if ((i > nr_in_width / 2) && (j < nr_in_height / 2)) {idx = (i + j) % lng;}
        else if ((i < nr_in_width / 2) && (j > nr_in_height / 2)) {idx = gene_rand_int(0, lng);}
        else {idx = 1;}
        palette_probs[idx] = 1;
      
      }
        
      // constructing a dynamic color palette with varying number of colors to which probabilities are assigned
      var allel_palette_dynamic = [];
      for (var n = 0; n < chosen_palette.length; n++) {
        allel_palette_dynamic.push([chosen_palette[n], palette_probs[n]]);
      }

      var element_color = gene_weighted_choice(allel_palette_dynamic);
      thumbnail.fill(element_color);
      
      thumbnail.rect(offset_x + i * x_step, offset_y + j * y_step, x_step, y_step); 
      
    }
  }
  
  
  // convert p5.Graphics into p5.Image
  var thumbnail_image = createImage(card_width, card_height);
  thumbnail_image.copy(thumbnail, 0, 0, card_width, card_height, 0, 0, card_width, card_height);
  
  return thumbnail_image;
}





function calculate_regular_grid(n_width, n_height, cell_size_x, cell_size_y) {
  
  var positions = [];
  
  for (let j = 0; j < n_height; j++) {
    var positions_row = [];
    for (let i = 0; i < n_width; i++) {
      positions_row.push([i * cell_size_x, j * cell_size_y]);
    }
    positions.push(positions_row)
  }
  
  return positions;
}





function calculate_random_grid_flat(n_width, n_height) {
  
  var positions = [];
  var total_elements = n_width * n_height;
  
  for (let i = 0; i < total_elements; i++) {
    positions.push([Math.random() * windowWidth, Math.random() * windowHeight]);
  }
  
  return positions;
}




function randomize_first_positions(positions, n) {
  
  var first_positions = [];
  
  for (let i = 0; i < n; i++) {
    first_positions.push([Math.random() * windowWidth, Math.random() * windowHeight]);
  }
  
  var last_positions = positions.slice(n);
  var all_positions = first_positions.concat(last_positions);
  
  return all_positions;
}





function interpolate_grid_flat(grid, target_grid, speed) {
  
  // first, compensate for the difference in length of two grids by adding / subtracting from grid
  var total_target_elements = grid_nr_x * grid_nr_y;
  var total_grid_elements = grid.length;
  var difference = total_target_elements - total_grid_elements;
  
  if (total_target_elements > total_grid_elements) { // grid too short, add random positions
    for (let n = 0; n < difference; n++) {grid.push([Math.random() * windowWidth, Math.random() * windowHeight]);}
  } else if (total_grid_elements > total_target_elements) { // grid too long, remove elements
    for (let n = 0; n < -difference; n++) {grid.pop();}
  }
  
  // interpolate positions between two grids
  var counter = 0;
  for (let j = 0; j < target_grid[0].length; j++) {
    for (let i = 0; i < target_grid.length; i++) {
      grid[counter][0] = lerp(grid[counter][0], target_grid[i][j][0], speed);
      grid[counter][1] = lerp(grid[counter][1], target_grid[i][j][1], speed);
      counter++
    }
  }
  
  return grid;
}

  

function translate_grid(grid, x_offset, y_offset) {
  
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      grid[i][j][0] += x_offset;
      grid[i][j][1] += y_offset;
    }
  }
  
  return grid;
}







function perturbe_grid_flat(grid, strength) {
  
  for (let i = 0; i < grid.length; i++) {
    grid[i][0] += 2 * Math.random() * strength - strength; // range [-strength, strength]
    grid[i][1] += 2 * Math.random() * strength - strength; // range [-strength, strength]
  }
  
  return grid;
}





function stretch_grid_flat(grid, strength_x, strength_y) {
  
  for (let i = 0; i < grid.length; i++) {
    grid[i][0] += 2 * Math.random() * strength_x - strength_x; // range [-strength_x, strength_x]
    grid[i][1] += 2 * Math.random() * strength_y - strength_y; // range [-strength_y, strength_y]
  }
  
  return grid;
}




// (gene() * (max - min)) + min
function slide_grid_flat(grid, strength_x, strength_y) {
  
  for (let i = 0; i < grid.length; i++) {
    //grid[i][0] += Math.random() * strength_x; // range [0, strength_x]
    grid[i][0] += Math.random() * (strength_x / 2) + strength_x / 2; // range [strength_x / 2, strength_x]
    grid[i][1] += 2 * Math.random() * strength_y - strength_y; // range [-strength_y, strength_y]
  }
  
  return grid;
}



  

function draw_grid_flat(grid) {
  
  fill(255, 255, 255);
  noStroke();
  
  var skip_points = Math.min(seeds.length, grid.length); // we take the smaller of these two as the number of elements to iterate through
  
  for (let i = skip_points; i < grid.length; i++) {
    circle(grid[i][0], grid[i][1], 5);
  }

}



function recalculate_grid() {
  
  // calculate size of the target grid based on the screen size
  grid_nr_x = Math.floor(windowWidth / grid_cell_size_x) - grid_nr_x_offset * 2;
  grid_nr_y = Math.floor(nr_of_thumbnails / grid_nr_x);

  // recreate target grid in the middle of the screen
  target_grid = calculate_regular_grid(grid_nr_x, grid_nr_y, grid_cell_size_x, grid_cell_size_y);
  target_grid = translate_grid(target_grid, windowWidth / 2 - (grid_nr_x - 1) * grid_cell_size_x / 2, windowHeight / 2 - (grid_nr_y - 1) * grid_cell_size_y / 2);

  // randomly shake the grid when the window gets resized
  positions_grid = perturbe_grid_flat(positions_grid, perturbe_strength);

  apply_seed_filtering();
  seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  previous_grid_nr_x = grid_nr_x;
  previous_grid_nr_y = grid_nr_y;
  
}






function thumbnails_on_grid_flat(seeds, grid, thumbnail_width, thumbnail_height) {
  
  fill(255,255,255);
  noStroke();

  textAlign(CENTER, CENTER);
  textFont(MonoMEK, seed_text_size);
  
  var text_shadow = 1;
  
  for (let i = 0; i < grid.length; i++) { // (let i = 0; i < grid.length; i++)
    
    if (seeds.length == 0) {return;} // if the seeds array is empty (too much filtering applied) exit the function as there are no thumbnails to display
    
    var seed_thumbnail = seeds[i].thumbnail;
    image(seed_thumbnail, grid[i][0] - thumbnail_width / 2, grid[i][1] - thumbnail_height / 2, thumbnail_width, thumbnail_height);

    fill(0, 0, 0);
    text(seeds[i].seed.toString(), grid[i][0] + text_shadow, grid[i][1] - seed_text_size / 5 + text_shadow);
    fill(255,255,255);
    text(seeds[i].seed.toString(), grid[i][0], grid[i][1] - seed_text_size / 5);

    if (i == seeds.length - 1) {return;} // if the counter reaches the total number of seeds, exit the function as there are no more thumbnails to display
  }

  
}








function calculate_closest_thumbnail_flat(seeds, grid) {
  
  var mouse_vec = createVector(mouseX, mouseY);
  var min_dist = 100000000000; // some very large number
  var closest_seed;
  
  var max_elements = Math.min(seeds.length, grid.length); // we take the smaller of these two as the number of elements to iterate through
      
  for (let i = 0; i < max_elements; i++) {

    var grid_vec = createVector(grid[i][0], grid[i][1]);
    var distance = mouse_vec.dist(grid_vec);

    if (distance < min_dist) {
      min_dist = distance;
      closest_seed = seeds[i].seed;
    }

    if (min_dist > grid_cell_size_y / 2) {closest_seed = "";} // return nothing if too far from any thumbnail

  }
  
  
  if (min_dist > grid_cell_size_y / 2) {closest_seed = "";} // return nothing if too far from any thumbnail
  
  return closest_seed;
  
}





function highlight_thumbnail() {
  var closest_seed = calculate_closest_thumbnail_flat(seeds, positions_grid);
  
  // have to use strick inequality here as in javascript 0 == ""
  // don't highlight if the mouse is in the bottom part of the screen (filter menu)
  if ((closest_seed !== "") && (mouseY < windowHeight - offset_bottom - button_height / 2)) { 
 
    //get the selected seed features by filterings seeds array by the seed number
    var selected_seed = seeds.filter((seed) => seed.seed == closest_seed)[0];
    //var seed_thumbnail = selected_seed.thumbnail;
    var seed_thumbnail = selected_seed.thumbnail.resizeNN(4 * thumbnail_width, 4 * thumbnail_height);
    var index_in_the_array = seeds.indexOf(selected_seed); // this is used only to determine filipping of the text
    
    // thumbnails on the right side of the grid will have a flipped text
    var flip_text;
    if (index_in_the_array <= nr_of_thumbnails / 2) {flip_text = 1;} // no flipping
    else {flip_text = -5;} // flip text

    // thumbnail image
    
    image(seed_thumbnail, mouseX - 2 * thumbnail_width, mouseY - 2 * thumbnail_height, 4 * thumbnail_width, 4 * thumbnail_height);

    // seed number
    
    fill(255,255,255);
    noStroke();

    textAlign(CENTER, CENTER);
    textFont(MonoMEK, seed_text_size * 3);

    var text_shadow = 4;

    fill(0, 0, 0);
    text(closest_seed.toString(), mouseX + text_shadow, mouseY - 1.75 * thumbnail_height + text_shadow);
    fill(255,255,255);
    text(closest_seed.toString(), mouseX, mouseY - 1.75 * thumbnail_height);
    
    // seed features
    
    // background
    rectMode(CORNER);
    fill(0, 0, 0, 200);
    rect(mouseX + flip_text * 2 * thumbnail_width, mouseY - 2 * thumbnail_height, 8 * thumbnail_width, 4 * thumbnail_height);
    
    // text
    textAlign(LEFT, TOP);
    textLeading(seed_text_size * 0.9);
    textFont(MonoMEK, seed_text_size);

    text_shadow = 1;
    var border_offset = seed_text_size / 2;
          
    var features_text = "pigments:    " + "\n"
                  + selected_seed.pigments + "\n\n"
                  + "palette:     " + selected_seed.palette_name + "\n"
                  + "pattern:     " + selected_seed.pattern + "\n"
                  + "dimension:   " + selected_seed.dimension + "\n"
                  + "structure:   " + selected_seed.structure + "\n"
                  + "form:        " + selected_seed.form + "\n"
                  + "dissipation: " + selected_seed.dissipation + "\n"
                  + "attachment:  " + selected_seed.attachment + "\n";
    
    fill(0, 0, 0);
    text(features_text, mouseX + flip_text * 2 * thumbnail_width + border_offset + text_shadow, mouseY - 2 * thumbnail_height - seed_text_size / 5 + border_offset + text_shadow, 8 * thumbnail_width);
    fill(255,255,255);
    text(features_text, mouseX + flip_text * 2 * thumbnail_width + border_offset, mouseY - 2 * thumbnail_height - seed_text_size / 5 + border_offset, 8 * thumbnail_width);
    
  }
  
}





function highlight_example() {
  
  var example_reel_speed = 0.1;
  var example_gap = 50;
  var example_width = 500;
  var example_height = 889;
  var example_reel_x;

  
  // pattern
  
  if ((mouseX < windowWidth / 2 - 3 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - 3 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 3 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 3 * offset_bottom / 4 - button_height / 2)) {
    
    if (pattern_idx == 1) { // noisy
      show_example_reel(examples.noisy, example_reel_speed, example_gap, example_width, example_height);
    } else if (pattern_idx == 2) { // graded
      show_example_reel(examples.graded, example_reel_speed, example_gap, example_width, example_height);
    } else if (pattern_idx == 3) { // layered
      show_example_reel(examples.layered, example_reel_speed, example_gap, example_width, example_height);
    } else if (pattern_idx == 4) { // stacked
      show_example_reel(examples.stacked, example_reel_speed, example_gap, example_width, example_height);
    } else if (pattern_idx == 5) { // composed
      show_example_reel(examples.composed, example_reel_speed, example_gap, example_width, example_height);
    }
    
  highlight_button = 1;
    
  // pigments
    
  } else if ((mouseX < windowWidth / 2 - 2 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - 2 * next_button_offset - button_width / 2) && (mouseY < windowHeight - offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - offset_bottom / 4 - button_height / 2)) {
    
    if (pigments_idx == 1) { // horizon, sunshine, grapefruit
      show_example_reel(examples["horizon, sunshine, grapefruit"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 2) { // night, embers, citrus
      show_example_reel(examples["night, embers, citrus"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 3) { // ivy, apatite, tourmaline
      show_example_reel(examples["ivy, apatite, tourmaline"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 4) { // sodalite, glacier, rust
      show_example_reel(examples["sodalite, glacier, rust"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 5) { // ocean, lapis, sulphur
      show_example_reel(examples["ocean, lapis, sulphur"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 6) { // moss, cedar, algae
      show_example_reel(examples["moss, cedar, algae"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 7) { // ink, steel, salt
      show_example_reel(examples["ink, steel, salt"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 8) { // charcoal, papyrus, marble
      show_example_reel(examples["charcoal, papyrus, marble"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 9) { // murex, rhodochrosite, marshmallow
      show_example_reel(examples["murex, rhodochrosite, marshmallow"], example_reel_speed, example_gap, example_width, example_height);
    } else if (pigments_idx == 10) { // furnace, ruby, soot
      show_example_reel(examples["furnace, ruby, soot"], example_reel_speed, example_gap, example_width, example_height);
    }
  
    highlight_button = 2;
  
  // dimension
  
  } else if ((mouseX < windowWidth / 2 - next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - next_button_offset - button_width / 2) && (mouseY < windowHeight - 3 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 3 * offset_bottom / 4 - button_height / 2)) {
  
    if (dimension_idx == 1) { // voxel
      show_example_reel(examples.voxel, example_reel_speed, example_gap, example_width, example_height);
    } else if (dimension_idx == 2) { // pin
      show_example_reel(examples.pin, example_reel_speed, example_gap, example_width, example_height);
    } else if (dimension_idx == 3) { // stick
      show_example_reel(examples.stick, example_reel_speed, example_gap, example_width, example_height);
    } else if (dimension_idx == 4) { // needle
      show_example_reel(examples.needle, example_reel_speed, example_gap, example_width, example_height);
    } else if (dimension_idx == 5) { // wire
      show_example_reel(examples.wire, example_reel_speed, example_gap, example_width, example_height);
    }
    
    highlight_button = 3;
  
  // structure
    
  } else if ((mouseX < windowWidth / 2 + button_width / 2) && (mouseX > windowWidth / 2 - button_width / 2) && (mouseY < windowHeight - offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - offset_bottom / 4 - button_height / 2)) {
    
    if (structure_idx == 1) { // cracks
      show_example_reel(examples.cracks, example_reel_speed, example_gap, example_width, example_height);
    } else if (structure_idx == 2) { // bands
      show_example_reel(examples.bands, example_reel_speed, example_gap, example_width, example_height);
    } else if (structure_idx == 3) { // sheets
      show_example_reel(examples.sheets, example_reel_speed, example_gap, example_width, example_height);
    } else if (structure_idx == 4) { // unbiased
      show_example_reel(examples.unbiased, example_reel_speed, example_gap, example_width, example_height);
    }
    
    highlight_button = 4;
  
  // form
    
  } else if ((mouseX < windowWidth / 2 + next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + next_button_offset - button_width / 2) && (mouseY < windowHeight - 3 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 3 * offset_bottom / 4 - button_height / 2)) {
    
    if (form_idx == 1) { // expressive
      show_example_reel(examples.expressive, example_reel_speed, example_gap, example_width, example_height);
    } else if (form_idx == 2) { // monolithic
      show_example_reel(examples.monolithic, example_reel_speed, example_gap, example_width, example_height);
    }
    
    highlight_button = 5;
    
  // dissipation
    
  } else if ((mouseX < windowWidth / 2 + 2 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + 2 * next_button_offset - button_width / 2) && (mouseY < windowHeight - offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - offset_bottom / 4 - button_height / 2)) {
    
    if (dissipation_idx == 1) { // clean
      show_example_reel(examples.clean, example_reel_speed, example_gap, example_width, example_height);
    } else if (dissipation_idx == 2) { // fuzzy
      show_example_reel(examples.fuzzy, example_reel_speed, example_gap, example_width, example_height);
    }
    
    highlight_button = 6;
    
  // attachment
    
  } else if ((mouseX < windowWidth / 2 + 3 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + 3 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 3 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 3 * offset_bottom / 4 - button_height / 2)) {

    if (attachment_idx == 1) { // tight
      show_example_reel(examples.tight, example_reel_speed, example_gap, example_width, example_height);
    } else if (attachment_idx == 2) { // detached
      show_example_reel(examples.detached, example_reel_speed, example_gap, example_width, example_height);
    } else if (attachment_idx == 3) { // loose
      show_example_reel(examples.loose, example_reel_speed, example_gap, example_width, example_height);
    } else if (attachment_idx == 4) { // floating
      show_example_reel(examples.floating, example_reel_speed, example_gap, example_width, example_height);
    }
    
    highlight_button = 7;
    
  } else {
    
    highlight_button = 0; // nothing will be highlighted
    
  }
  
  
  
}





function show_example_reel(reel_imgs, speed, gap, img_w, img_h) {
  
  reel_x = -(millis() * speed) % ((500 + gap) * reel_imgs.length);

  for (let i = 0; i < reel_imgs.length; i++) {
    image(reel_imgs[i], reel_x + i * (img_w + gap), windowHeight / 2 - img_h / 2, img_w, img_h);
    image(reel_imgs[i], reel_x + (i + reel_imgs.length) * (img_w + gap), windowHeight / 2 - img_h / 2, img_w, img_h);
  }
  
}







function show_filter_selection() {
  
  // pigments, pattern, dimension, structure, form, dissipation, attachment
  
  next_button_offset = windowWidth / 7;
  
  // background
  
  rectMode(CENTER);
  fill(255, 255, 255);
  noStroke();
  
  rect(windowWidth / 2 - 3 * next_button_offset, windowHeight - 4 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2 - 2 * next_button_offset, windowHeight - 2 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2 - next_button_offset, windowHeight - 4 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2, windowHeight - 2 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2 + next_button_offset, windowHeight - 4 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2 + 2 * next_button_offset, windowHeight - 2 * offset_bottom / 4, button_width, button_height);
  rect(windowWidth / 2 + 3 * next_button_offset, windowHeight - 4 * offset_bottom / 4, button_width, button_height);
  
  // text
  
  textAlign(CENTER, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size);
  
  var button_pattern = "pattern";
  var button_pigments = "pigments";
  var button_dimension = "dimension";
  var button_structure = "structure";
  var button_form = "form";
  var button_dissipation = "dissipation";
  var button_attachment = "attachment";
  
  
  fill(0, 0, 0);
  
  text(button_pattern, windowWidth / 2 - 3 * next_button_offset, windowHeight - 5 - 4 * offset_bottom / 4);
  text(button_pigments, windowWidth / 2 - 2 * next_button_offset, windowHeight - 5 - 2 * offset_bottom / 4);
  text(button_dimension, windowWidth / 2 - next_button_offset, windowHeight - 5 - 4 * offset_bottom / 4);
  text(button_structure, windowWidth / 2, windowHeight - 5 - 2 * offset_bottom / 4);
  text(button_form, windowWidth / 2 + next_button_offset, windowHeight - 5 - 4 * offset_bottom / 4);
  text(button_dissipation, windowWidth / 2 + 2 * next_button_offset, windowHeight - 5 - 2 * offset_bottom / 4);
  text(button_attachment, windowWidth / 2 + 3 * next_button_offset, windowHeight - 5 - 4 * offset_bottom / 4);
  
  

  
  if ((highlight_button == 1) && (pattern_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 - 3 * next_button_offset, windowHeight - 3 * offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(patterns[pattern_idx], windowWidth / 2 - 3 * next_button_offset, windowHeight - 5 - 3 * offset_bottom / 4);
  
  if ((highlight_button == 2) && (pigments_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 - 2 * next_button_offset, windowHeight - offset_bottom / 4, 2.5 * button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(pigments[pigments_idx], windowWidth / 2 - 2 * next_button_offset, windowHeight - 5 - 1 * offset_bottom / 4);
  
  if ((highlight_button == 3) && (dimension_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 - next_button_offset, windowHeight - 3 * offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(dimensions[dimension_idx], windowWidth / 2 - next_button_offset, windowHeight - 5 - 3 * offset_bottom / 4);
  
  if ((highlight_button == 4) && (structure_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2, windowHeight - offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(structures[structure_idx], windowWidth / 2, windowHeight - 5 - 1 * offset_bottom / 4);
  
  if ((highlight_button == 5) && (form_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 + next_button_offset, windowHeight - 3 * offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(forms[form_idx], windowWidth / 2 + next_button_offset, windowHeight - 5 - 3 * offset_bottom / 4);
  
  if ((highlight_button == 6) && (dissipation_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 + 2 * next_button_offset, windowHeight - offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(dissipations[dissipation_idx], windowWidth / 2 + 2 * next_button_offset, windowHeight - 5 - 1 * offset_bottom / 4);
  
  if ((highlight_button == 7) && (attachment_idx != 0)) {
    fill(255, 255, 255);
    rect(windowWidth / 2 + 3 * next_button_offset, windowHeight - 3 * offset_bottom / 4, button_width, button_height);
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }
  
  text(attachments[attachment_idx], windowWidth / 2 + 3 * next_button_offset, windowHeight - 5 - 3 * offset_bottom / 4);
  
  
}





function show_screen_arrows() {
  
  // arrows
  
  textAlign(CENTER, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size * 4);
  fill(255, 255, 255);
  
  if (grid_shift < Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y))) {
    text(">", windowWidth - offset_bottom / 2, windowHeight / 2);
  }
  
  if (grid_shift > 0) {
    text("<", offset_bottom / 2, windowHeight / 2);
  }

  
}




function show_minter_address() {
  
  textAlign(CENTER, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size);
  fill(255, 255, 255);
  
  var display_minter = "minter: " + minter;
  text(display_minter, windowWidth / 2, 4 * offset_bottom / 4);
  
  text("T E C T O N I C A  |  s e e d  e x p l o r e r", windowWidth / 2, 2 * offset_bottom / 4);

}





function show_seed_numbers() {
  
  textAlign(LEFT, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size);
  fill(255, 255, 255);
  
  var display_seed_nr = "number of seeds -> " + nr_of_seeds.toString();
  
  var grid_idx = grid_nr_y - 1; // bottom left corner
  text(display_seed_nr, positions_grid[grid_idx][0] - grid_cell_size_x / 2, positions_grid[grid_idx][1] + grid_cell_size_y);
  
  textAlign(RIGHT, CENTER);
  
  var display_screen_nr = "grid number -> " + (grid_shift + 1).toString() + "/" + (Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y)) + 1).toString();
  
  grid_idx = grid_nr_x * grid_nr_y - 1; // bottom right corner
  text(display_screen_nr, positions_grid[grid_idx][0] + grid_cell_size_x / 2, positions_grid[grid_idx][1] + grid_cell_size_y);
  
  
}






function show_grid_controls() {
  
  textAlign(CENTER, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size * 4);
  fill(255, 255, 255);
  
  
  var grid_idx_1 = grid_nr_y * Math.floor(grid_nr_x / 2) - 1; // grid bottom middle
  var grid_idx_2 = grid_nr_y * (Math.floor(grid_nr_x / 2) + 1) - 1; // grid bottom middle
  
  // buttons
  
  fill(255, 255, 255);
  text("-", windowWidth / 2 - grid_cell_size_x, positions_grid[grid_idx_1][1] + 3 * grid_cell_size_y / 4);
  text("+", windowWidth / 2 + grid_cell_size_x, positions_grid[grid_idx_2][1] + 3 * grid_cell_size_y / 4);
  

}







function apply_seed_filtering() {
  
  seeds = all_seeds.slice(); // reset the seed array before each new filtering
  
  if (pigments_idx != 0) {seeds = seeds.filter((seed) => seed.pigments == pigments[pigments_idx]);}
  if (pattern_idx != 0) {seeds = seeds.filter((seed) => seed.pattern == patterns[pattern_idx]);}
  if (dimension_idx != 0) {seeds = seeds.filter((seed) => seed.dimension == dimensions[dimension_idx]);}
  if (structure_idx != 0) {seeds = seeds.filter((seed) => seed.structure == structures[structure_idx]);}
  if (form_idx != 0) {seeds = seeds.filter((seed) => seed.form == forms[form_idx]);}
  if (dissipation_idx != 0) {seeds = seeds.filter((seed) => seed.dissipation == dissipations[dissipation_idx]);}
  if (attachment_idx != 0) {seeds = seeds.filter((seed) => seed.attachment == attachments[attachment_idx]);}
  
  nr_of_seeds = seeds.length;
  
}




function preload_examples() {

  const shuffleArray = shuffleArray_proto(Math.random); // random seed
  shuffleArray(example_features); // shuffle example images
  
  for (let n = 0; n < example_features.length; n++) {
    
    var img_path = "examples/" + example_features[n][0];
    var img = loadImage(img_path);
    
    examples[pigments[example_features[n][1][0]]].push(img);
    examples[patterns[example_features[n][1][1]]].push(img);
    examples[dimensions[example_features[n][1][2]]].push(img);
    examples[structures[example_features[n][1][3]]].push(img);
    examples[forms[example_features[n][1][4]]].push(img);
    examples[dissipations[example_features[n][1][5]]].push(img);
    examples[attachments[example_features[n][1][6]]].push(img);
    
  }
  
}




function seed_input_screen() {
  
  background(0);

  // button background

  rectMode(CENTER);
  
  if (address_valid == true) {fill(0, 255, 0);} // green
  else {fill(255, 255, 255);} // white

  rect(windowWidth / 2 + seed_input.width - seed_button_w / 2, windowHeight / 2 + seed_input.height / 2, seed_button_w, seed_button_h);


  // button text

  fill(0, 0, 0);
  noStroke();
  textAlign(CENTER, CENTER);
  textLeading(seed_text_size * 0.9);
  textFont(MonoMEK, seed_text_size);

  text("generate seeds", windowWidth / 2 + seed_input.width - seed_button_w / 2, windowHeight / 2 + seed_input.height / 2 - 4);
  
  
  // validation sign
  
  textSize(seed_text_size * 2);
  
  if (address_valid == true) {
    fill(0, 255, 0); // green
    text("Ξ", windowWidth / 2 - seed_input.width / 2 - 25, windowHeight / 2 + seed_input.height / 2 - 7);
    
  } else {
    fill(255, 0, 0); // red
    text("X", windowWidth / 2 - seed_input.width / 2 - 25, windowHeight / 2 + seed_input.height / 2 - 7);
    
  }

  
  
}





function field_typing() {
  temp_input = this.value();
  address_valid = validate_address(temp_input)
  
}




// quick plausibility test for ETH addresses (doesn't check the checksum)
// from: https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid
function validate_address(address) {
  return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}





function keyPressed() {
  
  // only take key input on the seed explorer page, not the seed input screen
  if (input_screen == false) {
    
    if (key === 's') {
      saveCanvas(`tectonica_seed_explorer_${parseInt(Math.random()*10000000)}`, "png");

    } else if (keyCode === RIGHT_ARROW) {
      
      if (grid_shift < Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y))) {
        grid_shift += 1;
        grid_shift = constrain(grid_shift, 0, Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y)));

        apply_seed_filtering();
        seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));
        positions_grid = slide_grid_flat(positions_grid, 500 * perturbe_strength, 10 * perturbe_strength);

      }
      
    } else if (keyCode === LEFT_ARROW) {
      
      if (grid_shift > 0) {
        grid_shift -= 1;
        grid_shift = constrain(grid_shift, 0, Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y)));

        apply_seed_filtering();
        seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));
        positions_grid = slide_grid_flat(positions_grid, -500 * perturbe_strength, 10 * perturbe_strength);

      }
      
    } else if (keyCode === UP_ARROW) {
      
      nr_of_thumbnails += 50;
      
      // calculate size of the target grid based on the screen size
      grid_nr_x = Math.floor(windowWidth / grid_cell_size_x) - grid_nr_x_offset * 2;
      grid_nr_y = Math.floor(nr_of_thumbnails / grid_nr_x);

      // recreate target grid in the middle of the screen
      target_grid = calculate_regular_grid(grid_nr_x, grid_nr_y, grid_cell_size_x, grid_cell_size_y);
      target_grid = translate_grid(target_grid, windowWidth / 2 - (grid_nr_x - 1) * grid_cell_size_x / 2, windowHeight / 2 - (grid_nr_y - 1) * grid_cell_size_y / 2);

      // randomly shake the grid when the window gets resized
      positions_grid = perturbe_grid_flat(positions_grid, perturbe_strength);

      apply_seed_filtering();
      seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

      previous_grid_nr_x = grid_nr_x;
      previous_grid_nr_y = grid_nr_y;

      
    } else if (keyCode === DOWN_ARROW) {
      
      nr_of_thumbnails -= 50;
      
      if (nr_of_thumbnails < 1) {nr_of_thumbnails = grid_nr_x;}
      
      // calculate size of the target grid based on the screen size
      grid_nr_x = Math.floor(windowWidth / grid_cell_size_x) - grid_nr_x_offset * 2;
      grid_nr_y = Math.floor(nr_of_thumbnails / grid_nr_x);

      // recreate target grid in the middle of the screen
      target_grid = calculate_regular_grid(grid_nr_x, grid_nr_y, grid_cell_size_x, grid_cell_size_y);
      target_grid = translate_grid(target_grid, windowWidth / 2 - (grid_nr_x - 1) * grid_cell_size_x / 2, windowHeight / 2 - (grid_nr_y - 1) * grid_cell_size_y / 2);

      // randomly shake the grid when the window gets resized
      positions_grid = perturbe_grid_flat(positions_grid, perturbe_strength);

      apply_seed_filtering();
      seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

      previous_grid_nr_x = grid_nr_x;
      previous_grid_nr_y = grid_nr_y;
      
    }
      
    
  }
  
  
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  recalculate_grid();
  
  // only run after the input fields were created
  if (input_field_created == true) {
    seed_input.position(windowWidth / 2 - seed_input.width / 2, windowHeight / 2);
  }
  
}




function mouseClicked() {
  
  // pattern button
  
  if ((mouseX < windowWidth / 2 - 3 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - 3 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 4 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 4 * offset_bottom / 4 - button_height / 2)) {
    
    pattern_idx = (pattern_idx + 1) % patterns.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  
  // pigments button
  
  if ((mouseX < windowWidth / 2 - 2 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - 2 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 2 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 2 * offset_bottom / 4 - button_height / 2)) {
    
    pigments_idx = (pigments_idx + 1) % pigments.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // dimension button
  
  if ((mouseX < windowWidth / 2 - next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 - next_button_offset - button_width / 2) && (mouseY < windowHeight - 4 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 4 * offset_bottom / 4 - button_height / 2)) {
    
    dimension_idx = (dimension_idx + 1) % dimensions.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // structure button
  
  if ((mouseX < windowWidth / 2 + button_width / 2) && (mouseX > windowWidth / 2 - button_width / 2) && (mouseY < windowHeight - 2 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 2 * offset_bottom / 4 - button_height / 2)) {
    
    structure_idx = (structure_idx + 1) % structures.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // form button
  
  if ((mouseX < windowWidth / 2 + next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + next_button_offset - button_width / 2) && (mouseY < windowHeight - 4 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 4 * offset_bottom / 4 - button_height / 2)) {
    
    form_idx = (form_idx + 1) % forms.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // dissipation button
  
  if ((mouseX < windowWidth / 2 + 2 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + 2 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 2 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 2 * offset_bottom / 4 - button_height / 2)) {
    
    dissipation_idx = (dissipation_idx + 1) % dissipations.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // attachment button
  
  if ((mouseX < windowWidth / 2 + 3 * next_button_offset + button_width / 2) && (mouseX > windowWidth / 2 + 3 * next_button_offset - button_width / 2) && (mouseY < windowHeight - 4 * offset_bottom / 4 + button_height / 2) && (mouseY > windowHeight - 4 * offset_bottom / 4 - button_height / 2)) {
    
    attachment_idx = (attachment_idx + 1) % attachments.length; // cycle through the list
    apply_seed_filtering();
    positions_grid = randomize_first_positions(positions_grid, nr_of_seeds);
    
    grid_shift = 0; // reset grid_shift
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));

  }
  
  // generate seeds button
  
  if ((address_valid == true) && (input_screen == true) && (mouseX > windowWidth / 2 + seed_input.width - seed_button_w) && (mouseX < windowWidth / 2 + seed_input.width) && (mouseY > windowHeight / 2 + seed_input.height / 2 - seed_button_h / 2) && (mouseY < windowHeight / 2 + seed_input.height / 2 + seed_button_h / 2)) {
    
    input_screen = false;
    seed_input.hide();
    minter = temp_input;
    generate_seeds_now = true;
    background(0);
    
  }
  
  // left arrow button
  
  if ((grid_shift > 0) && (mouseX > offset_bottom / 2 - seed_text_size / 2) && (mouseX < offset_bottom / 2 + seed_text_size / 2) && (mouseY > windowHeight / 2 + seed_text_size * 0.8 - 2.5 * seed_text_size / 2) && (mouseY < windowHeight / 2 + seed_text_size * 0.8 + 2.5 * seed_text_size / 2)) {
    
    grid_shift -= 1;
    grid_shift = constrain(grid_shift, 0, Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y)));

    apply_seed_filtering();
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));
    positions_grid = slide_grid_flat(positions_grid, -500 * perturbe_strength, 10 * perturbe_strength);
    
  }
  
  // right arrow button
  
  if ((grid_shift < Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y))) && (mouseX > windowWidth -  offset_bottom / 2 - seed_text_size / 2) && (mouseX < windowWidth - offset_bottom / 2 + seed_text_size / 2) && (mouseY > windowHeight / 2 + seed_text_size * 0.8 - 2.5 * seed_text_size / 2) && (mouseY < windowHeight / 2 + seed_text_size * 0.8 + 2.5 * seed_text_size / 2)) {
    
    grid_shift += 1;
    grid_shift = constrain(grid_shift, 0, Math.floor(nr_of_seeds / (grid_nr_x * grid_nr_y)));

    apply_seed_filtering();
    seeds = seeds.slice(grid_nr_x * grid_nr_y * grid_shift, grid_nr_x * grid_nr_y * (grid_shift + 1));
    positions_grid = slide_grid_flat(positions_grid, 500 * perturbe_strength, 10 * perturbe_strength);
    
  }
  
  // minus button
  
  var grid_idx_1 = grid_nr_y * Math.floor(grid_nr_x / 2) - 1; // grid bottom middle
  
  if ((mouseX > windowWidth / 2 - grid_cell_size_x - seed_text_size) && (mouseX < windowWidth / 2 - grid_cell_size_x + seed_text_size) && (mouseY > positions_grid[grid_idx_1][1] + grid_cell_size_y - seed_text_size) && (mouseY < positions_grid[grid_idx_1][1] + grid_cell_size_y + seed_text_size)) {
    
    nr_of_thumbnails -= 50;

    if (nr_of_thumbnails < 1) {nr_of_thumbnails = grid_nr_x;}

    recalculate_grid();
    
  }
  
  
  // plus button
  
  var grid_idx_2 = grid_nr_y * (Math.floor(grid_nr_x / 2) + 1) - 1; // grid bottom middle
  
  if ((mouseX > windowWidth / 2 + grid_cell_size_x - seed_text_size) && (mouseX < windowWidth / 2 + grid_cell_size_x + seed_text_size) && (mouseY > positions_grid[grid_idx_2][1] + grid_cell_size_y - seed_text_size) && (mouseY < positions_grid[grid_idx_2][1] + grid_cell_size_y + seed_text_size)) {
    
    nr_of_thumbnails += 50;

    recalculate_grid();
    
  }
  

  
  // prevent default
  return false;
}


