<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-alei',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'modules' => [
        'index' => [
            'class' => 'alei\modules\index\Module'
        ],
        'admin' => [
            'class' => 'alei\modules\admin\Module',
        ]
    ],
    'controllerNamespace' => 'alei\controllers',

    'components' => [
        'request' => [
            'csrfParam' => '_csrf-frontend',
        ],
        'user' => [
            //'identityClass' => 'common\models\User',
            'identityClass' => 'alei\modules\admin\model\AAdmin',
            'enableAutoLogin' => false,
            'identityCookie' => ['name' => '_identity-alei', 'httpOnly' => true],
            'loginUrl' => ['admin/site/login']      //此处设置默认登录页，如果未登录就会跳转到该页
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-alei',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'admin/site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'admin' => 'admin/site/index',
                'index' => 'index/site/index',
            ],
        ],


    ],
    'defaultRoute' => 'index/site/index',//默认路由
    'params' => $params,
];

