<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Leave_review_model extends CI_Model{
    
    function reque()
    {
         $config['upload_path'] = './uploaded/';
		  $config['allowed_types'] = 'gif|jpg|png|jpeg';
          $config['remove_spaces'] = TRUE;
		  $config['max_size']	= '1024';
		  $config['max_width']  = '1024';
		  $config['max_height']  = '768';
		
		  $this->load->library('upload', $config);
            $this->upload->do_upload();
            $image_data = $this->upload->data();
            $data = array
                        (
                            'product_name'=>$image_data['file_name'],
                            'date'=>date("Y/m/d"),
                            'text'=>$this->input->post('text'),
                            'author'=>$this->session->userdata('nickname')
                        );
            $this->db->insert('reviews', $data);
    }
   
}       
?>