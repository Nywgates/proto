/* Class Map */
class Map{
	constructor(state) {
		this.largeur = state.map.largeur;
		this.hauteur = state.map.hauteur;
        this.data_map = state.map.data_map;
        this.t_map = state.map.t_map;
		this.state = state;
		this.img_grp = new Array();
		this.img_bloc = new Array(this.largeur);
		for (let i = 0; i < this.largeur; i++)
			this.img_bloc[i] = new Array(this.hauteur);
	}
	actualize_map(state){
		this.data_map = state.map.data_map;
		this.t_map = state.map.t_map;
		this.state = state;
		for (let y = 0; y < this.largeur; y++)
        {
			for (let x = 0; x < this.hauteur; x++)
            {
				let bloc = this.t_map[x][y];
				this.img_bloc[x][y].data = bloc;
			}
		}
	}
    draw_bloc (game, posx, posy, largeur, hauteur, x, y) {
		let bloc = this.t_map[x][y];
        let xx = 22.5;
		let yy = 22.5;
		let file;
		var polygon = new Phaser.Geom.Polygon([
			xx, yy - 17.5,
			xx + 52 * 0.5, yy,
			xx + 52 * 0.5, yy + 7,
			xx, yy + 17.5 + 7,
			xx - 52 * 0.5, yy + 7,
			xx - 52 * 0.5, yy,
		]);
        if ((bloc.posx + bloc.posy) % 2 == 0 && bloc.type != 0)
			file = "iso_2_pair";
		else
			file = "iso_2";
		let img;
        switch (bloc.type){
			case 2:
				this.img_grp.push(game.add.image(posx, posy, file).setDisplaySize(largeur, hauteur));
				this.img_grp.push(img = game.add.image(posx, posy - 10, file).setDisplaySize(largeur, hauteur));
				img.type = 1;
				break ;
			case 1:
				this.img_grp.push(img = game.add.image(posx, posy, file).setDisplaySize(largeur, hauteur));
                img.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
				img.setInteractive();
				img.type = 1;
				break ;
			case 0:
				img = undefined;
				break ;
		}
		this.img_bloc[bloc.posx][bloc.posy] = new Bloc(bloc, img, posx, posy);
    }
    draw_map(game)
    {
		let largeur = this.state.windowX / 28;
        let hauteur = this.state.windowY / 14;
        let tileWidthHalf = largeur * 0.5;
        let tileHeightQuarter = hauteur * 0.25;
        let centerX = (this.state.windowX - (this.largeur * largeur)) / 2;
		let centerY = this.state.windowY * 0.125;
        for (let y = 0; y < this.largeur; y++)
        {
            for (let x = 0; x < this.hauteur; x++)
            {
                let tx = (this.largeur * tileWidthHalf) + (x - y) * tileWidthHalf;
				let ty = y * tileHeightQuarter + x * tileHeightQuarter;
                this.draw_bloc(game, centerX + tx, centerY + ty, largeur, hauteur, x, y);
                //let text1 = game.add.text(centerX + tx - 25, centerY + ty - 10, `${x},${y}`);
                //game.imageGroup.add(text1);
            }
		}
	}
	reset_tint(){
        for (let x = 0; x < this.largeur; x++)
        {
            for (let y = 0; y < this.hauteur; y++)
            {
				let bloc = this.img_bloc[x][y];
				if (bloc.img != undefined)
				{
					bloc.img.tint = undefined;
					bloc.tint = undefined;
				}	
            }
		}
	}
	draw_range(range, see_range, tint){
		for (let i = 0; i < range.length; i++){
			if (this.img_bloc[range[i].posx][range[i].posy].img != undefined)
			{
				let bloc = this.img_bloc[range[i].posx][range[i].posy];
				let tmp_tint = (isNaN(tint * 95096) ? undefined : tint * 95096)
				bloc.img.tint = tmp_tint;
				bloc.tint = tmp_tint;

			}
		}
		for (let i = 0; i < see_range.length; i++){
			if (this.img_bloc[see_range[i].posx][see_range[i].posy].img != undefined)
			{
				let bloc = this.img_bloc[see_range[i].posx][see_range[i].posy]
				bloc.img.tint = tint;
				bloc.tint = tint;
			}
		}
	}
	destroy_all() {
		for (let i = 0; i < this.img_grp.length; i++){
			if (this.img_grp[i])
				this.img_grp[i].destroy();
		}
	}
}
/*END*/

/* Class d'un Bloc */
class Bloc{
	constructor (data, img, posx, posy) {
		this.tint = undefined;
		this.data = data;
		this.img = img;
		this.isPers = undefined;
		if (data.type != 0)
			this.img.data = this;
		this.game_pos = [posx, posy];
	}
	destroy () {
	}
}
/*END*/
