<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {
    
    function prdcts()
    {  
        if ($this->session->userdata('is_logged_in'))
        {
            $this->load->model('products_model');
            
            $query = $this->products_model->pages();
            $this->load->view('cap_page');
            $this->load->view('Products_page', $query);
            
            $this->load->view('basement_page');
        }
        else
        {
            redirect('authorization');
        }
    }

}
