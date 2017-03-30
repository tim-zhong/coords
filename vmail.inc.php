<?php
function vmail($to,$title,$body,$from,$files=null,$info=null,$returnpath=''){

  $mailhosts=array(
  'local',
  //'http://dev.antradar.com/mrelay.php',
  );
  
  $headers="From: $from\n";  
  $rp=$from;
  if ($returnpath!='') $rp=$returnpath;
  $headers .= "Reply-To: $rp\n";
  $headers .= "Return-Path: no-reply@timzhong.com\n";
  $headers .= "Sender: no-reply@timzhong.com\n";
  $headers .= "X-Mailer: Vmail";

  if (!isset($files)){
    $headers .="\nContent-type: text/html; charset=utf-8\nMIME-Version: 1.0";
    $midx=rand(0,count($mailhosts)-1);
    $mailhost=$mailhosts[$midx];
    $logbody=$mailhost;

    if ($mailhost=='local'){@mail($to,$title,$body,$headers,'-r no-reply@timzhong.com');}
    else {
    $req=array('body'=>$body,'title'=>$title,'headers'=>$headers,'to'=>$to);
    $request='';
    foreach ($req as $f=>$v){
      $request.="&$f=".urlencode($v);
    }
    $request=trim($request,'&');
    
    $key='squid13321';
    $token=time();
    $auth=md5($key.$token);
    $curl=curl_init($mailhost.'?auth='.$auth.'&token='.$token);
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($curl,CURLOPT_POST,1);
    curl_setopt($curl,CURLOPT_POSTFIELDS,"$request");
    $logbody=$mailhost.': '.curl_exec($curl);   
    }
    
      //$logbody=$mailhost;//str_replace("'","\'",$headers."\n".$body);
      $logtitle=$title;
      $logfrom=$from;
      $logto=$to;

      return 1;
  }

  $seed=md5(time());
  $mime_boundary = "==Multipart_Boundary_x{$seed}x";

  $headers .= "\nMIME-Version: 1.0\n" .
             "Content-Type: multipart/mixed;\n" .
             " boundary=\"{$mime_boundary}\"";

  $body = "This is a multi-part message in MIME format.\n\n" .
            "--{$mime_boundary}\n" .
            "Content-type: text/html; charset=\"utf-8\"\n" .
            "Content-Transfer-Encoding: 7bit\n\n" .
            $body . "\n\n";

  foreach ($files as $file){
    $data = chunk_split(base64_encode($file['content']));

  $body .= "--{$mime_boundary}\n" .
             "Content-Type: ".$file['type'].";\n" .
             " name=\"".$file['name']."\"\n" .
             "Content-Disposition: attachment;\n" .
             " filename=\"".$file['name']."\"\n" .
             "Content-Transfer-Encoding: base64\n\n" .
             $data . "\n\n";
    
  }
  $body.="--{$mime_boundary}--\n";

  @mail($to,$title,$body,$headers,'-r no-reply@timzhong.com');
  
  return 1;

}
