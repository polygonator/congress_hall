<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Review_model extends CI_Model{
    
    function pages()
    {
        $per_page = 4;  
        
        

        $query = $this->db->query('SELECT * FROM `reviews`');
    
        
        $product_num = $query->num_rows();
        $page_num = ceil($product_num/$per_page);
        
        if($this->input->get('p') == NULL)
        {
            $_GET["p"]="1";
        }
        
        $p=$this->input->get('p');
        
        if(!ctype_digit($p) or $p>$page_num)
        {
           $p="1"; 
        }
	   
        $first=$p*$per_page-$per_page;
        $query = $this->db->query('SELECT * FROM `reviews` LIMIT '.$first.', '.$per_page.'');
     
        $q = array('query'=>$query->result(), 'total'=>$page_num, 'p'=>$p, 'num_rows'=>$query->num_rows(), 'que'=>$query);
        
        return $q;
    }
    
}       
?>