<?php
// Récupérer les données du formulaire depuis la requête POST
$formData = json_decode(file_get_contents('php://input'), true);

// Convertir les tableaux en chaînes sérialisées
$formDataSerialized = array_map(function ($value) {
    return is_array($value) ? implode(", ", $value) : $value;
}, $formData);

// Spécifier le chemin où vous souhaitez enregistrer le fichier CSV
$filePath = 'reponses_invites.csv';

// Ouvrir le fichier en mode écriture (ajout à la fin du fichier)
$file = fopen($filePath, 'a');

// Vérifier si le fichier est ouvert avec succès
if ($file) {
    // Ajouter la date à la fin de chaque ligne
    $formDataSerialized[] = date('Y-m-d H:i:s');

    // Écrire une ligne CSV dans le fichier
    fputcsv($file, $formDataSerialized);

    // Fermer le fichier
    fclose($file);
    
    // Convertir l'ensemble du tableau en une seule chaîne
    $formDataSerializedString = implode("\n", $formDataSerialized);


    // Envoyer un e-mail de notification
    $to = 'frederic.mathe@gmail.com,nanatoure088@gmail.com'; // Remplacez cela par votre adresse e-mail
    $subject = 'Nouvelle réponse au formulaire';
    $message = "Une nouvelle réponse au formulaire a été soumise. Vérifiez le fichier CSV pour plus de détails.\n\n" . $formDataSerializedString;

    // Vous pouvez ajouter des en-têtes supplémentaires si nécessaire
    $headers = 'From: frederic.mathe@gmail.com' . "\r\n" .
        'Reply-To: frederic.mathe@gmail.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Envoyer l'email
    if(mail($to, $subject, $message, $headers)) {
        echo "Email envoyé avec succès.";
    } else {
        echo "Échec de l'envoi de l'email.";
    }

    // Répondre au client
    echo 'Données du formulaire enregistrées avec succès !';
} else {
    // En cas d'erreur lors de l'ouverture du fichier
    echo 'Erreur lors de l\'ouverture du fichier CSV.';
}


?>
