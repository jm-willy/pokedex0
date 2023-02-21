var pkindex = 9 - 9
var init_pkindex = 1 - 9;

$(document).ready(function(){

    function next_pk_index(){
        init_pkindex = parseInt($('.poke').last().attr('id')) + 1;
        pkindex = init_pkindex + 8;
    }

    function previous_pk_index(){
        init_pkindex = parseInt($('.poke').first().attr('id')) - 9;
        pkindex = init_pkindex + 8;
    }

    function negative_pkindex(){
        if ((init_pkindex < 1 || (pkindex < 1))) {
            init_pkindex = 1008 - 8;
            pkindex = 1008;
        }
    }

    function positive_pkindex(){
        if ((init_pkindex > 1008 || (pkindex > 1008))) {
            init_pkindex = 1;
            pkindex = 9;
        }
    }

    function add_grid(){
        $('main').empty();
        $('main').addClass('container-fluid');
        for (let index = 0; index < 3; index++){
            $('main').append('<section class="row container-fluid d-flex justify-content-center align-items-center"></section>');
        }
        for (let index = 0; index < 3; index++){
            $('section').append('<div class="col-3 poke container-fluid d-flex justify-content-center align-items-center"></div>');
        }
        $('.poke').each(function(count) {
            $(this).attr('id', (count + init_pkindex).toString());
            //onclick, popup
            }
        )
        
    };

    function request_next(){
        next_pk_index();
        positive_pkindex();
        add_grid();
        for (let index = init_pkindex; index <= pkindex; index++) {
            var local_dict = [];
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+index.toString()+"/", true);
            xhttp.send();
            xhttp.onreadystatechange = async function() {
              if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);;

                img_ = data['sprites']['other']['official-artwork']["front_default"];
                //$("."+data['id']+"").append("<img src='"+img_+"'>");
                $("#"+data['id']+"").append("<img src='"+img_+"'>");
                
                local_dict['id'] = data['id'];
                local_dict['img'] = data['sprites']['other']['official-artwork']["front_default"];
                local_dict['name'] = data['species']["name"];
                local_dict['hp'] = data['stats'][0]["base_stat"];
                local_dict['attack'] = data['stats'][1]["base_stat"];
                local_dict['defense'] = data['stats'][2]["base_stat"];
                local_dict['special-attack'] = data['stats'][3]["base_stat"];
                local_dict['special-defense'] = data['stats'][4]["base_stat"];
                local_dict['speed'] = data['stats'][5]["base_stat"];
              };
            };
        }
    }

    function request_previous(){
        previous_pk_index();
        negative_pkindex();
        add_grid();
        for (let index = init_pkindex; index <= pkindex; index++) {
            var local_dict = [];
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+index.toString()+"/", true);
            xhttp.send();
            xhttp.onreadystatechange = async function() {
              if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);;

                img_ = data['sprites']['other']['official-artwork']["front_default"];
                //$("."+data['id']+"").append("<img src='"+img_+"'>");
                $("#"+data['id']+"").append("<img src='"+img_+"'>");
                
                local_dict['id'] = data['id'];
                local_dict['img'] = data['sprites']['other']['official-artwork']["front_default"];
                local_dict['name'] = data['species']["name"];
                local_dict['hp'] = data['stats'][0]["base_stat"];
                local_dict['attack'] = data['stats'][1]["base_stat"];
                local_dict['defense'] = data['stats'][2]["base_stat"];
                local_dict['special-attack'] = data['stats'][3]["base_stat"];
                local_dict['special-defense'] = data['stats'][4]["base_stat"];
                local_dict['speed'] = data['stats'][5]["base_stat"];
              };
            };
        }
    }

    //FIRST 9
    $('.button').on('click', add_grid())
    request_next();
    //
    $('.left').on('click', function(){request_previous()})
    $('.right').on('click', function(){request_next()})


});