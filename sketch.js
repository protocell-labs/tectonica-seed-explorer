/*

@@@@@@@@@@@@@@@@@%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@%*@@@@@%*+=====+***#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%+*=:::::--=-----====+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@%+:-=:::::---==+********+=#@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@+::::-=-::-===+**########****%@@@@@@@@@@@@@@@@@@@@@%#
@@@@@@@@@@@@@@@%-:::::::-=--=++*****########**+=*@@@@@@@@@@@@@@@@@@#%@
@@@@@@@@@@@@@@%-:::::::::-++++++***###########*+=+%@@@@@@@@@@@@@@%#%@@
@@@@@@@@@@@@@@*::::::::--==++++***############**+=+%@@@@@@@@@@@%##@@@@
@@@@@@@@@@@@@%--::---::-=++=+****##############*+=-+%@@@@@@@@@%#%@@@@@
@@@@@@@@@@@@@+::::::::-=++**++****#############*++-:-#@@@@@@@##@@@@@@@
@@@@@@@@@@@@@=::::.:::==++*+*==*++++**##***###**+++******#%%#@@@@@@@@@
@@@@@@@@@@@@@-........::::::-+++#***##########%%%%%%%%%%@@@%%%@@@@@@@@
@@@@@@@@@@@@@=:.......::::::-****#%%%%%%%%%%%%%%@%%%%%%%%%%@@%@@@@@@@@
@@@@@@@@@@@@%*=--::::---===-==-+*#%@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@
@@@@@@@@@@@*==+=-=========--=--+*#%%%%%%%#*#%%*=*#%%*==#%*--+%@@@@@@@@
@@@@@@@@@@@==++=+============++**#%+::+##=:-+=:=#*+*++=*##**#%@@@@@@@@
@@@@@@@@@@@*=++===+=--=======+++*#%##*#%##%#*+=-+***#%%%%%%%%@@@@@@@@@
@@@@@@@@@@@%==--+*++==-=====+++=-----:::::::---:::-#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@#=+-+=++==-====++++***+--::::--+*##+-==#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@#=++**+====+==++++**+++++===---======+%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@%****++===++++*****+*****###*****+===#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@%+=----===+***##****************+++%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@#-=-----==++**###**+=----==--==+**%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%-==-----==++**#####*********++**%@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%====------=++**#******##****+**%@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@#-==++==----==+*###*########***%@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@*-#*=+++===----===+*##########**%@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@#-:-#%%+++++==-=-=--===+**++++++*%@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@#-::::=@@@%#+====------====----=--*%@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@#+-::::::-+@@@@@%#+==------=====+=---::-=+*%@@@@@@@@@@@@@@@@@@
@@@@#*=-::::::::::-+@@@@@%*+-:-----====--::::::::::::-=+*#%@@@@@@@@@@@
#+-::::::::::::::::-+@@@@#-:::::------:::::::::::::::::::::--+#%%@@@@@
::::::::::::--:::::::=%@@%=:::::::-=-:::=**++-::::::::::::--------=+#%
--::::::::::-:::::::::=%@%*=+-:-=-=#*-----::::::-:--------------------
--::::--::::--:::-:::::=#%+:::::::-=-::::::::::::::::----------------=
-::------:::------::::::-#+.::::=####*+=::::::::::--:----------------=
--::-----:::-----::::::::-=:::=#%@@@@%%%%%%#+-:::::--::-::----------==
---::--:---:---::--::::::-+###%@@@@@@@@@@@@@%+------------:---------=-


                        T E C T O N I C A

                     s e e d  e x p l o r e r


           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/




//////GLOBALS//////

var MonoMEK, minter;
var target_grid, positions_grid, grid_nr_x, grid_nr_y, seed_text_size;
var offset_bottom, button_width, button_height, next_button_offset;

var original_nr_of_seeds = 1000; // always the same
var nr_of_seeds = original_nr_of_seeds; // includes filtering
var all_seeds = [];
var seeds = [];

var nr_of_thumbnails = 200; // approximate number of positions in the target grid
var thumbnail_width = 36; // 16:9 aspect ratio
var thumbnail_height = 64; // 16:9 aspect ratio
var perturbe_strength = 5;

var grid_cell_size_x = 46;
var grid_cell_size_y = 74;
var grid_nr_x_offset = 2; // offset in nr of thumbnails from the edge of the screen
var seed_text_size = grid_cell_size_x / 2;
var grid_shift = 0; // shift seed positions so we can display the ones that are off screen
var previous_grid_nr_x, previous_grid_nr_y;

var pigments_idx = 0; // "ALL" - default
var pattern_idx = 0; // "ALL" - default
var dimension_idx = 0; // "ALL" - default
var structure_idx = 0; // "ALL" - default
var form_idx = 0; // "ALL" - default
var dissipation_idx = 0; // "ALL" - default
var attachment_idx = 0; // "ALL" - default
var highlight_button = 0; // to determine which button will be highlighted

var input_screen = true; // we start with the input screen first
var temp_input = "";
var address_valid = false;
var seed_input;
var input_field_created = false;
var seed_button_w = 175;
var seed_button_h = 25;
var seed_input_w = 400;
var seed_input_h = 20;

var generate_seeds_now = false;

// create flat positions grid (we do this here so we don't get an error when resizing the window during loading screen)

positions_grid = calculate_random_grid_flat(grid_nr_x, grid_nr_y);


// get URL search params - add this to the URL => ?tez_wallet=tz1Lkgy2gYECvVK55yyiwjbSSZeUoQp8Azxo
const urlSearchParams = new URLSearchParams(window.location.search);
const urlParams = Object.fromEntries(urlSearchParams.entries());
const tez_wallet = urlParams['tez_wallet'];



function preload() {
  
  MonoMEK = loadFont('libs/MEK-Mono.otf');
  
  preload_examples();
  
}



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  // seed input screen
  
  seed_input = createInput('paste a full Tezos address');
  seed_input.input(field_typing); // callback for when something is being entered
  input_field_created = true; // so we don't get an error while resizing the screen during loading
  
  seed_input.style('font-family: monospace');
  seed_input.style('font-size: 16px');
  seed_input.size(seed_input_w, seed_input_h);
  seed_input.position(windowWidth / 2 - seed_input.width / 2, windowHeight / 2);
  
  // if tez_wallet is already defined trhough URL search params, then skip the intro screen
  if (tez_wallet != undefined) {
    input_screen = false;
    seed_input.hide();
    minter = tez_wallet;
    generate_seeds_now = true;
    background(0);
  }

}




function draw() {
  
  
  if (input_screen == true) { // address input screen
  
    seed_input_screen();

  
  } else if ((input_screen == false) && (generate_seeds_now == true)) {
             
    generate_seeds();
    
    generate_seeds_now = false; // exit this if statement
    
             
  } else { // seed explorer
    
    background(0);

    positions_grid = interpolate_grid_flat(positions_grid, target_grid, 0.05);

    thumbnails_on_grid_flat(seeds, positions_grid, thumbnail_width, thumbnail_height, grid_shift);

    draw_grid_flat(positions_grid);

    show_filter_selection();
    
    show_screen_arrows();
    
    show_grid_controls();
    
    show_minter_address();
    
    show_seed_numbers();

    highlight_thumbnail();

    highlight_example();
  }

  
}






