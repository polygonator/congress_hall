<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Cart_model extends CI_Model{
    
    function pages()
    {
        $per_page = 4;  
        
        $search = $this->input->post('searcher');// передать через параметр
        $search1 = $this->input->get('filter');// передать через параметр
        
        if (!$search)
        {
            $search = $search1;
        }
        
        $query_cart = $this->db->query('SELECT * FROM `cart` WHERE user_id='.$this->session->userdata('id').'');
        
        if (($search != NULL) || ($search1 != NULL))
        {
            
            $query_cart = $this->db->query('
                                                SELECT * FROM `cart` 
                                                INNER JOIN `products`
                                                ON `cart`.`product_id`=`products`.`id`
                                                WHERE user_id='.$this->session->userdata('id').' 
                                                AND  name  LIKE \'%'.$search.'%\' 
                                                OR description LIKE \'%'.$search.'%\'
                                                ORDER BY `cart`.`id_cart`
                                            ');
        }
        else
        {
            $query_cart = $this->db->query('
                                                SELECT * FROM `cart` 
                                                INNER JOIN `products`
                                                ON `cart`.`product_id`=`products`.`id`
                                                WHERE user_id='.$this->session->userdata('id').' 
                                                ORDER BY `cart`.`id_cart`
                                            ');
        }
        
        $row = $query_cart->row();
        $product_num = $query_cart->num_rows();
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
        $row = $query_cart->row();
        
        if (($search != NULL) || ($search1 != NULL))
        {
            $query_cart = $this->db->query('
                                                SELECT * FROM `cart` 
                                                INNER JOIN `products`
                                                ON `cart`.`product_id`=`products`.`id`
                                                WHERE user_id='.$this->session->userdata('id').' 
                                                AND  name  LIKE \'%'.$search.'%\' 
                                                OR description LIKE \'%'.$search.'%\'
                                                ORDER BY `cart`.`id_cart`
                                                LIMIT '.$first.', '.$per_page.'
                                            ');
        }
        else
        {
            $query_cart = $this->db->query('
                                                SELECT * FROM `cart` 
                                                INNER JOIN `products`
                                                ON `cart`.`product_id`=`products`.`id`
                                                WHERE user_id='.$this->session->userdata('id').' 
                                                ORDER BY `cart`.`id_cart`
                                                LIMIT '.$first.', '.$per_page.'
                                            ');
        }

        
        $q = array('query'=>$query_cart->result(), 'total'=>$page_num, 'p'=>$p,  'que1'=>$query_cart, 'num_rows'=>$query_cart->num_rows(), 'input'=>$search);
        
        return $q;
    }
    
    function drop()
    {
        $query_cart = $this->db->query('SELECT * FROM `cart` WHERE user_id='.$this->session->userdata('id').' AND product_id='.$this->input->get('p_id').'');
        $query_product = $this->db->query('SELECT * FROM `products` WHERE id='.$this->input->get('p_id').'');
        
        $sum = $query_cart->row()->quantity_cart + $query_product->row()->quantity;
        
        $this->db->query('DELETE FROM `cart` WHERE user_id='.$this->session->userdata('id').' AND product_id='.$this->input->get('p_id').'');
        $this->db->query('UPDATE `products` SET quantity='.$sum.' WHERE id='.$this->input->get('p_id').'');
        
    }
}       
?>