<?php
namespace alei\modules\index\controllers;

use yii\rest\Controller;
class SiteController extends Controller
{
    public function actionIndex()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'message' => 'API test Ok!',
            'code' => 100,
        ];
    }

}


?>