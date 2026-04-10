<?php  
/**
 * class Modelr extends Controller
 */ 
class Model{
	public $db;
	function __construct()
	{
		$this->db = new Database();
	}
}
?>