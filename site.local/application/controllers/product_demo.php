<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product_demo extends CI_Controller {
    
    public function demo()
    {  
        if ($this->session->userdata('is_logged_in'))
        {
            $this->load->model('product_demo_model');

            $id = $this->input->get('ident');
            
            $data = $this->product_demo_model->product_info($id);
            
            $this->load->view('cap_page');
            $this->load->view('product_demo_page', $data);
            $this->load->view('basement_page');

        }
        else
        {
            redirect('authorization');
        }
    }
    
    function order_create($product_id)
    {
        $this->load->model('product_demo_model');
        $this->product_demo_model->order($product_id);
        redirect('products');
    }

}
