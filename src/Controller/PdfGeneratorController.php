<?php

namespace App\Controller;

use Dompdf\Dompdf;
use App\Entity\Scm;
use Dompdf\Options;
use App\Entity\ChargeType;
use App\Service\ChargeManager;
use App\Repository\ChargeRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PdfGeneratorController extends AbstractController
{
    /**
     * @Route("/pdf/generator/{id}", name="app_pdf_generator")
     */
    public function index(Scm $scm, ChargeRepository $chargeRepo, ChargeManager $chargeManager)
    {

        $totalChargePerMonth = $chargeRepo->getTotalChargePerMonth($scm,'2020-01601','2020-12-31');
        $totalChargePerType =$chargeRepo->getTotalChargePerType($scm);
        $totalCharge = $chargeRepo->getTotalCharge($scm,'2020-01-01','2020-12-31');
        $options = new Options();
        $options->set('defaultFont', 'Roboto');
        foreach ($totalChargePerType as $key => $value) {
            // dump($totalChargePerType);
            // dump($scm->getUsers());
            // dd($totalChargePerMonth);
        }
    
        $dompdf = new Dompdf($options);
        
       
        $html = $this->renderView('pdf_generator/pdf.html.twig', [
            'headline' => "Test pdf generator",
            'scm' => $scm,
            'scm.users' =>$scm->getUsers(),
            'total_charge_per_month' => $totalChargePerMonth,
            'totalChargePerType' => $totalChargePerType,
            'totalCharge' => $totalCharge
        ]);

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream("testpdf.pdf", [
            "Attachment" => false
        ]);
    }
}
