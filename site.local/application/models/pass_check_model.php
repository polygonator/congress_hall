<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Pass_check_model extends CI_Model{
    
    function pe_check()
    {
        $email = $this->session->userdata('email');
        $pass = $this->input->post('pass_ver');
        $sql = $this->db->query("SELECT password FROM `users` WHERE `email`='$email'"); 
        $row = $sql->row();
        $hash = $row->password;
        
        return password_verify($pass, $hash);
    }
}
?>
