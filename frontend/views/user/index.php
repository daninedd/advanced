<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel frontend\models\UserSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Users';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create User', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'Id',
            'Account',
            'Password',
            'Nickname',
            'AvatarUrl:ntext',
            // 'Auth_Status',
            // 'Id_Card',
            // 'Name',
            // 'Mobile',
            // 'Weixin_Open_Id',
            // 'Last_Login_Ip',
            // 'Last_Login_Time',
            // 'Registration_IP',
            // 'Registration_Channel',
            // 'Balance',
            // 'Bonus_Target',
            // 'Bonus_Level',
            // 'Bonus_Level_Yesterday',
            // 'Bonus_Today',
            // 'Score',
            // 'Inviter',
            // 'Parent',
            // 'ggfather',
            // 'Inviter_Grade',
            // 'Status',
            // 'Status_Change_Reason:ntext',
            // 'Creation_Time',
            // 'Bonus_Day',
            // 'Is_Cash_white',
            // 'Login_Error_Num',
            // 'Pause_Bonus',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
