<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registration extends CI_Controller {
    
    function register()
    {        
        $this->load->view('registration_page');
    }
    
    function reg()
    {
        $this->load->model('registration_model');
        $this->registration_model->put_data();
    }
    
}
