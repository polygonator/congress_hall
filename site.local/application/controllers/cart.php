<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart extends CI_Controller {
    
    function crt()
    {
        $this->load->model('cart_model');
            
        $query = $this->cart_model->pages();
        $this->load->view('cap_page');
        $this->load->view('cart_page', $query);
        $this->load->view('basement_page');
    }
    
    function drop_item()
    {
        $this->load->model('cart_model');
            
        $query = $this->cart_model->drop();
        redirect ('cart');
    }

}
