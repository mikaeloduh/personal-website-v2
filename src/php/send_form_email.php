<?php
  /**
   * This is use of PHPMailer SMTP servers.
   */
  // SMTP needs accurate times, and the PHP time zone MUST be set
  date_default_timezone_set("Etc/UTC");

  // Import PHPMailer classes into the global namespace
  // These must be at the top of your script, not inside a function
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\OAuth;
  use League\OAuth2\Client\Provider\SomeProvider;

  require "../vendor/autoload.php";

  $mail = new PHPMailer;
  try {
    // Server setting
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    // $mail->Debugoutput = "html";

    $mail->Host = "smtp.mail.com";
    $mail->Port = 123;
    $mail->SMTPSecure = "tls";
    $mail->SMTPAuth = true;
    $mail->AuthType = "XOAUTH2";

    $email = "someone@mail.com";
    $clientId = "RANDOMCHARS-----duv1n2.apps.com";
    $clientSecret = "RANDOMCHARS-----lGyjPcRtvP";
    $refreshToken = "RANDOMCHARS-----DWxgOvPT003r-yFUV49TQYag7_Aod7y0";

    $provider = new SomeProvider(
      [
        "clientId" => $clientId,
        "clientSecret" => $clientSecret,
      ]
    );

    $mail->setOAuth(
    new OAuth(
        [
          "provider" => $provider,
          "clientId" => $clientId,
          "clientSecret" => $clientSecret,
          "refreshToken" => $refreshToken,
          "userName" => $email,
        ]
      )
    );

    $mail->setFrom($_POST["email"], $_POST["first_name"]);
    $mail->addAddress("someone@mail.com", "Some One");
    $mail->addReplyTo($_POST["email"], $_POST["first_name"]);

    $mail->Subject = "PHPMailer from michaelduh.com";
    $mail->Body = $_POST["comments"];

    //send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }

  } catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: ", $mail->ErrorInfo;
  }

?>
