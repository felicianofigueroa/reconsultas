<?php  

class View{
	public $mensaje;
	public $personas;
	function __construct()
	{
		//echo "<p><h2 class=center>Vista BAse</p></h2>";
	}
	function render($nombre){
    	//$ruta='views/' . $nombre . '.php';
    	//echo $nombre;
        require 'views/' . $nombre . '.php';
    }
}
?>