<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reset extends CI_Controller {
    
    function res()
    {  
        $this->load->view('cap_page');
        $this->load->view('reset_page');
        $this->load->view('basement_page');
    }

}
