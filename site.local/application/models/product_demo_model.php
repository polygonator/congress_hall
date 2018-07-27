<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Product_demo_model extends CI_Model{
    
    function product_info($id)
    {
        
        $query = $this->db->query('SELECT * FROM `products` WHERE id='.$id.'');
        $row = $query->row();
        $data = array(
                        'name'=>$row->name,
                        'material'=>$row->material,
                        'proportions'=>$row->proportions,
                        'face_thickness'=>$row->face_thickness,
                        'price'=>$row->price,
                        'quantity'=>$row->quantity,
                        'description'=>$row->description,
                        'image'=>$row->image,
                        'list_size'=>$row->quantity,
                        'product_id'=>$id
                    );
        return $data;
    }
    
    function order($product_id)
    {
        $data = array(
                        'product_id'=>$product_id,
                        'user_id'=>$this->session->userdata('id'),
                        'quantity_cart'=>$this->input->post('quantity')
                    );
        $que = $this->db->query('SELECT * FROM `products` WHERE id='.$product_id.'');
        $diff =$que->row()->quantity - $data['quantity_cart'];
        $this->db->query('UPDATE `products` SET quantity='.$diff.' WHERE id='.$product_id.'');
        $this->db->insert('cart', $data);
    }
}       
?>