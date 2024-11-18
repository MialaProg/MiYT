//Local save

/*
- saver_version => MàJ reset

=>> lcl_pl_id
- plid [ ,  ,  , ]
- pl_ctn [[] ,[], []]
- watch_id [ ,  ,  , ]

=>> lcl_vid_id
- vidid [ , , , ]
- vid_pgs [ [pgs, len, %], [], [], []]
 */

console.log('saver.js >> V2.04.0');

var saver_version = 'V0.04.0S.1'; //A changer pour reset les données => Eviter les erreurs au max

function lcl_rmv_all() {
    // Effacer tous les éléments
    localStorage.clear();
}

function lcl_load(id) {
    let rsrc = localStorage.getItem(id);
    return rsrc;
}

function lcl_load_list(id) {
    let rsrc = lcl_load(id);
    if (!rsrc) { rsrc = ""; }
    return rsrc.split("¤@¤");
}

function lcl_load_LIST_IN_list(id, idx) {
    let rsrc = lcl_load_list(id)[idx];
    if (!rsrc) { rsrc = ""; }
    return rsrc.split("¤]¤");
}

function lcl_save(id, data) {
    localStorage.setItem(id, data);
}

function lcl_save_list(id, list) {
    let rsrc = list.join("¤@¤");
    lcl_save(id, rsrc);
}

function lcl_save_IN_list(id, data, idx = 'push') {
    let rsrc = lcl_load_list(id);
    if (Number.isInteger(idx) && idx < rsrc.length) {
        rsrc[idx] = data;
    } else {
        rsrc.push(data);
    }
    lcl_save_list(id, rsrc);
}

function lcl_del_IN_list(id, idx) {
    let rsrc = lcl_load_list(id);

    rsrc.splice(idx, 1);

    lcl_save_list(id, rsrc);
}

function lcl_save_LIST_IN_list(id, list, idx = 'push') {
    let data = list.join("¤]¤");
    lcl_save_IN_list(id, data, idx);
    return data;
}

// Initially for Pb#26
function chgPL(id, list) {
    let list_pl_id = lcl_load_list('plid');
    lcl_pl_id = list_pl_id.indexOf(id);

    if (lcl_pl_id == -1) {
       console.log("ERR: No PL in local sto.");
    }else{
        lcl_save_LIST_IN_list('pl_ctn', list, lcl_pl_id);
        console.log("Mialog: LclSvg PL Update");
    }
}

//Reset lors des MàJ importantes
if (lcl_load('saver_version') != saver_version) {
    lcl_rmv_all();
    lcl_save('saver_version', saver_version);
}


var $LOCAL_STORAGE = true;