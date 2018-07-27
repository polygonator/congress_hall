<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Products_model extends CI_Model{
    
    function pages()
    {
        $per_page = 4;  
        
        $search = $this->input->post('searcher');// передать через параметр
        $search1 = $this->input->get('filter');// передать через параметр
        
        if ($search1)
        {
            $search = $search1;
        }
        
        if (($search != NULL) || ($search1 != NULL))
        {
             $query = $this->db->query('SELECT * FROM `products` WHERE name LIKE \'%'.$search.'%\' OR description LIKE \'%'.$search.'%\'');
        }
        else
        {
            $query = $this->db->query('SELECT * FROM `products`');
        }
        
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
        $query = $this->db->query('SELECT * FROM `products` LIMIT '.$first.', '.$per_page.'');
        
        if (($search != NULL) || ($search1 != NULL))
        {
             $query = $this->db->query('SELECT * FROM `products` WHERE name LIKE \'%'.$search.'%\' OR description LIKE \'%'.$search.'%\' LIMIT '.$first.', '.$per_page.'');
        }
        else
        {
            $query = $this->db->query('SELECT * FROM `products` LIMIT '.$first.', '.$per_page.'');
        }

        
        $q = array('query'=>$query->result(), 'total'=>$page_num, 'p'=>$p, 'num_rows'=>$query->num_rows(), 'que'=>$query, 'input'=>$search);
        
        return $q;
    }
    
}       
?>