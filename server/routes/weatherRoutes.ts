import { Router } from 'express';
import * as weatherController from '../controllers/weatherController';

const router = Router();

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getWeatherForecast);
router.get('/auto-complete', weatherController.getAutoComplete);
router.get('/temperature-chart', weatherController.getTemperatureChart);

export default router;
